import { useCurrentTime, useTimePeriod } from "hooks";
import { useMemo, useState } from "react";
import clsx from "clsx";
import styles from "./TimeClock.module.scss";
import ClockSector from "./ClockSector";
import PeriodIcon from "./PeriodIcon";

const TimeClock = () => {
  const [isUseMeridiem, setIsNoMeridiem] = useState(true);
  const period = useTimePeriod();
  const time = useCurrentTime(isUseMeridiem ? "hh:mm" : "HH:mm");
  const meridiem = useCurrentTime("A");
  const day = useCurrentTime("DD");

  return (
    <div className={styles.clockContainer}>
      {/* Absolute decoration */}
      <div className={styles.upperSemiCircle} />
      <ClockSector period="night" />
      <PeriodIcon period={period} />
      {/* Main content */}
      <div className={styles.upperHolder}>
        {isUseMeridiem && (
          <div className={styles.meridiem} onClick={() => setIsNoMeridiem(!isUseMeridiem)}>
            {meridiem}
          </div>
        )}
        <div
          className={clsx(styles.time, { [styles.onlyTime]: !isUseMeridiem })}
          onClick={() => setIsNoMeridiem(!isUseMeridiem)}
        >
          {time}
        </div>
      </div>
      <div className={styles.dayHolder}>
        <div className={styles.dayText}>Day</div>
        <div className={styles.dayNumber}>{day}</div>
      </div>
    </div>
  );
};

export default TimeClock;
