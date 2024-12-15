import { ApIcon } from "components";
import { useCurrentTime } from "hooks";
import { useMemo } from "react";

const distanceToCorner = 38;
const radius = 120;

const getPeriodIconPosition = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const angle = (180 / 720) * ((hours + 6) * 60 + minutes) * (Math.PI / 180);
  const cosSign = hours >= 18 || hours < 6 ? -1 : 1;

  return {
    left: distanceToCorner + radius + cosSign * radius * Math.cos(angle),
    top: distanceToCorner + radius - Math.abs(radius * Math.sin(angle)),
  };
};

const PeriodIcon = ({ period }) => {
  const time = useCurrentTime("HH:mm");
  const iconStyle = useMemo(() => {
    return {
      position: "absolute",
      zIndex: 2,
      transformOrigin: "0 0",
      transform: "translate(-50%, -50%)",
      filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.15))",
      transition: "left 0.5s linear, top 0.5s linear",
      ...getPeriodIconPosition(time),
    };
  }, [period, time]);

  return <ApIcon size="40px" period={period} color={`var(--${period}-text)`} sx={iconStyle} />;
};

export default PeriodIcon;
