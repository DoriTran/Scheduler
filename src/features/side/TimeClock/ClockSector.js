import { useMemo } from "react";
import { useTimePeriod } from "hooks";
import { getPeriodRange } from "utils";
import styles from "./TimeClock.module.scss";

const toRadians = (degrees) => degrees * (Math.PI / 180);
const toBelow18 = (time) => (time > 18 ? time - 12 : time);

const sectorClippath = (angle) => {
  if (angle === 0) {
    // 0 degrees → 2 point polygon
    return "polygon(50% 50%, 0 50%)";
  }
  if (angle > 0 && angle <= 45) {
    // 0 < angle <= 45 degrees → 3 point polygon
    const a = toRadians(angle);
    const y = `${Math.round(50 - 50 * Math.tan(a))}%`;
    return `polygon(50% 50%, 0 50%, 0 ${y})`;
  }
  if (angle > 45 && angle <= 135) {
    // 45 < angle <= 135 degrees → 4 point polygon
    const a = toRadians(angle - 45);
    const left = Math.sqrt(5000);
    const right = Math.sqrt(5000) * Math.sin(toRadians(45));
    const x = `${Math.round(Math.sqrt(left ** 2 + right ** 2 - 2 * left * right * Math.cos(a)))}%`;
    return `polygon(50% 50%, 0 50%, 0 0, ${x} 0)`;
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

const Sector = ({ period, startHour, endHour }) => {
  const sectorStyles = useMemo(() => {
    const angle = (endHour - startHour) * 15;

    return {
      transformOrigin: "center",
      transform: `rotate(${(startHour >= 18 || startHour === 0 ? startHour - 12 : startHour) * 15 - 90}deg)`,
      clipPath: sectorClippath(angle),
      backgroundColor: `var(--${period})`,
    };
  }, [period, startHour, endHour]);

  return <div className={styles.clockSector} style={sectorStyles} />;
};

const ClockSector = () => {
  const period = "evening"; // useTimePeriod();
  const { firstSector, secondSector } = useMemo(() => {
    const range = getPeriodRange(period);
    const hasSecondSector = range[0] < 18 && range[1] > 18;
    return {
      firstSector: {
        start: toBelow18(range[0]),
        end: hasSecondSector ? 18 : toBelow18(range[1]),
      },
      ...(hasSecondSector && {
        secondSector: {
          start: 18 - 12,
          end: range[1] - 12,
        },
      }),
    };
  }, [period]);

  console.log(firstSector, secondSector);

  return (
    <>
      <Sector period={period} startHour={firstSector.start} endHour={firstSector.end} />
      {secondSector && <Sector period={period} startHour={secondSector.start} endHour={secondSector.end} />}
    </>
  );
};

export default ClockSector;
