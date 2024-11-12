import { useMemo } from "react";
import DayTab from "./DayTab/DayTab";
import { getCurrentWeekDates } from "./util";
import styles from "./WeekView.module.scss";

const WeekView = () => {
  const dates = useMemo(() => getCurrentWeekDates(), []);

  return (
    <div className={styles.weekViewContainer}>
      {dates.map((date) => (
        <DayTab key={date} day={date} />
      ))}
    </div>
  );
};

export default WeekView;
