import { useMemo } from "react";
import clsx from "clsx";
import DayTab from "./DayTab/DayTab";
import { getCurrentWeekDates } from "./util";
import styles from "./WeekView.module.scss";
import css from "../index.module.scss";

const WeekView = () => {
  const dates = useMemo(() => getCurrentWeekDates(), []);

  return (
    <div className={clsx(css.cardWrapper, styles.weekViewContainer)}>
      {dates.map((date) => (
        <DayTab key={date} day={date} />
      ))}
    </div>
  );
};

export default WeekView;
