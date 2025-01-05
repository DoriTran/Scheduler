import { getPeriodByTime, getPeriodRange } from "utils";
import { ApIcon } from "components";
import { useMemo } from "react";
import moment from "moment";
import styles from "./EmptyGap.module.scss";

const verifyBeforeGetPeriod = (time) => {
  if (!time) return undefined;
  return getPeriodByTime(time);
};

const formatTime = (momentObj) => {
  const hours = momentObj.format("H");
  const minutes = momentObj.format("mm");

  if (minutes === "00") return `${hours}`;
  return `${hours}h${minutes}`;
};

const containerHeight = {
  zone: "150px",
  large: "70px",
  small: "35px",
};

const HoverGap = ({ from, to, period: inputPeriod }) => {
  const period = verifyBeforeGetPeriod(from) || verifyBeforeGetPeriod(to) || inputPeriod;

  const { periodLable, range, size } = useMemo(() => {
    const periodRange = getPeriodRange(period);
    const startGapRange = from || moment({ hour: periodRange[0] });
    const endGapRange = to || moment({ hour: periodRange[1] });
    const minutes = endGapRange.diff(startGapRange, "minutes");

    let gapSize = "large";
    if (startGapRange.hour() === period[0] && endGapRange.hour() === period[1]) gapSize = "zone";
    if (minutes <= 60) gapSize = "small";

    return {
      periodLable: period.charAt(0).toUpperCase() + period.slice(1),
      gapRange: `${formatTime(startGapRange)} ~ ${formatTime(endGapRange)}`,
      size: gapSize,
    };
  }, [period, from, to]);

  return (
    <div
      className={styles.hoverGap}
      style={{ borderColor: `var(--${period})`, color: `var(--${period})`, height: containerHeight[size] }}
    >
      <ApIcon period={period} size={size !== "small" ? 40 : 15} />
      <div className={styles.description}>
        <div className={styles.period} {...(size === "small" && { display: "none" })}>
          {periodLable}
        </div>
        <div className={styles.gap}>{range}</div>
      </div>
    </div>
  );
};

export default HoverGap;
