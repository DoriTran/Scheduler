import { useCurrentTime, useTimePeriod } from "hooks";
import styles from "./TimeClock.module.scss";
import ClockSector from "./ClockSector";
import PeriodIcon from "./PeriodIcon";

const TimeClock = () => {
  const period = useTimePeriod();
  const time = useCurrentTime("hh:mm");
  const meridiem = useCurrentTime("A");
  const day = useCurrentTime("DD");

  return (
    <div className={styles.clockContainer}>
      {/* Absolute decoration */}
      <div className={styles.upperSemiCircle} />
      <ClockSector period={period} />
      <PeriodIcon period={period} />
      {/* Main content */}
      <div className={styles.upperHolder}>
        <div className={styles.meridiem}>{meridiem}</div>
        <div className={styles.time}>{time}</div>
      </div>
      <div className={styles.dayHolder}>
        <div className={styles.dayText}>Day</div>
        <div className={styles.dayNumber}>{day}</div>
      </div>
    </div>
  );
};

export default TimeClock;
