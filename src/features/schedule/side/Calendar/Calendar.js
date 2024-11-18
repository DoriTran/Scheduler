import ApCalendar from "components/ApCalendar/ApCalendar";
import { useState } from "react";
import { useCurrentTime } from "hooks";
import clsx from "clsx";
import css from "../../index.module.scss";
import styles from "./Calendar.module.scss";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState(useCurrentTime("MM/yyyy"));

  return (
    <div className={clsx(css.cardWrapper, styles.calendarWrapper)}>
      <ApCalendar
        value={selectedDate}
        setValue={setSelectedDate}
        setViewValue={setView}
        title={
          <div className={styles.calendar}>
            <div className={css.title}>Calendar</div>
            <div className={styles.date}>{view}</div>
          </div>
        }
      />
    </div>
  );
};

export default Calendar;
