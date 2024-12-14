import { getPeriodRange } from "utils";
import { useMemoPrev } from "hooks";
import { useMemo } from "react";
import styles from "./TimeClock.module.scss";

const transtime = "1s";
const toRadians = (degrees) => degrees * (Math.PI / 180);
const isInSundown = (hour) => hour >= 18 || hour < 6;
const inSameZone = (first, second) => isInSundown(first) === isInSundown(second);

const sectorClippath = (angle) => {
  if (angle === 0) {
    // 0 degrees → 2 point polygon
    return "polygon(50% 50%, 0 50%, 0 50%, 0 50%, 0 50%)";
  }
  if (angle > 0 && angle <= 45) {
    // 0 < angle <= 45 degrees → 3 point polygon
    const a = toRadians(angle);
    const y = `${Math.round(50 - 50 * Math.tan(a))}%`;
    return `polygon(50% 50%, 0 50%, 0 ${y}, 0 ${y}, 0 ${y})`;
  }
  if (angle > 45 && angle <= 135) {
    // 45 < angle <= 135 degrees → 4 point polygon
    const a = toRadians(angle - 45);
    const left = Math.sqrt(5000);
    const right = Math.sqrt(5000) * Math.sin(toRadians(45));
    const x = `${Math.round(Math.sqrt(left ** 2 + right ** 2 - 2 * left * right * Math.cos(a)))}%`;
    return `polygon(50% 50%, 0 50%, 0 0, ${x} 0, ${x} 0)`;
  }
  if (angle > 135 && angle <= 180) {
    // 135 < angle <= 180 degrees → 5 point polygon
    const a = toRadians(angle - 135);
    const left = Math.sqrt(5000);
    const right = Math.sqrt(5000) * Math.sin(toRadians(45));
    const y = `${Math.round(Math.sqrt(left ** 2 + right ** 2 - 2 * left * right * Math.cos(a)))}%`;
    return `polygon(50% 50%, 0 50%, 0 0, 100% 0, 100% ${y})`;
  }
  return null;
};

const Sector = ({ period, startHour, endHour, delay }) => {
  if (delay) console.log(startHour, endHour);
  const sector = useMemoPrev(
    (prevSector) => {
      const angle = (endHour - startHour) * 15;
      const startAngle =
        startHour === prevSector.startHour
          ? prevSector.startAngle
          : prevSector.startAngle +
            ((startHour === 0 ? 24 : startHour) - prevSector.startHour) * 15 +
            (!inSameZone(startHour, prevSector.startHour) ? 180 : 0);

      return {
        style: {
          transformOrigin: "center",
          transform: `rotate(${startAngle}deg)`,
          clipPath: sectorClippath(angle),
          backgroundColor: `var(--${period})`,
          transition: `1s ease-in-out ${delay ? "1s" : ""}`,
        },
        startAngle,
        startHour,
      };
    },
    [period, startHour, endHour],
    {
      startAngle: (!isInSundown(startHour) ? startHour * 15 : startHour * 15 + 180) - 90,
      startHour,
    }
  );

  return <div className={styles.clockSector} style={sector.style} />;
};

const ClockSector = ({ period }) => {
  const { firstSector, secondSector } = useMemo(() => {
    const range = getPeriodRange(period);
    const hasSecondSector = range[0] < 18 && range[1] > 18;
    return {
      firstSector: {
        start: range[0],
        end: hasSecondSector ? 18 : range[1],
      },
      secondSector: {
        start: 6,
        end: hasSecondSector ? range[1] - 12 : 6,
      },
    };
  }, [period]);

  return (
    <>
      <Sector period={period} startHour={firstSector.start} endHour={firstSector.end} />
      <Sector period={period} startHour={secondSector.start} endHour={secondSector.end} delay />
    </>
  );
};

export default ClockSector;
