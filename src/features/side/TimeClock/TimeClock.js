import { useCurrentTime } from "hooks";
import styles from "./TimeClock.module.scss";
import ClockSector from "./ClockSector";

const TimeClock = () => {
  const time = useCurrentTime("hh:mm");
  const meridiem = useCurrentTime("A");
  const day = useCurrentTime("DD");

  return (
    <div className={styles.clockContainer}>
      <div className={styles.upperSemiCircle} />
      <ClockSector />
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
