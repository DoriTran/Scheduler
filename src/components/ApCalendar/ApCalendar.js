import { useState, useMemo } from "react";
import moment from "moment";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ApIcon from "components/ApIcon/ApIcon";
import clsx from "clsx";
import styles from "./ApCalendar.module.scss";

const CalendarCell = ({ label, outMonth, isToday, isSelected, onClick }) => {
  return (
    <div
      className={clsx(typeof label === "string" ? styles.weekdayCell : styles.cell, {
        [styles.outMonth]: outMonth,
        [styles.today]: isToday,
        [styles.selected]: isSelected,
      })}
      onClick={onClick}
    >
      <div>{label}</div>
    </div>
  );
};

const ApCalendar = ({
  value,
  setValue,
  setViewValue,
  onChange,
  title = moment().format("DD/MM/YYYY"),
  weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
}) => {
  const [view, setView] = useState({
    month: moment().month(),
    year: moment().year(),
  });

  const today = moment();

  const { currentMonth, prevMonth, nextMonth, monthDays, prevMonthDays, nextMonthDays, endPrevMonth } = useMemo(() => {
    const memoizedCurrentMonth = moment({ year: view.year, month: view.month });
    const memoizedPrevMonth = memoizedCurrentMonth.clone().subtract(1, "month");
    const memoizedNextMonth = memoizedCurrentMonth.clone().add(1, "month");

    const calculatedMonthDays = memoizedCurrentMonth.daysInMonth(); // Total days in the current month
    const calculatedEndPrevMonth = memoizedPrevMonth.daysInMonth(); // Last day of the previous month

    // Calculate the number of days from the previous month to fill up the first row
    const firstDayWeekday = memoizedCurrentMonth.startOf("month").isoWeekday(); // 1 for Monday, 7 for Sunday
    const daysFromPrevMonth = firstDayWeekday === 1 ? 0 : firstDayWeekday - 1;
    const calculatedPrevMonthDays = Array.from(
      { length: daysFromPrevMonth },
      (_, i) => calculatedEndPrevMonth - daysFromPrevMonth + i + 1
    );

    // Calculate the remaining days from the next month to fill up a total of 42 cells
    const daysFromNextMonth = 42 - (calculatedMonthDays + calculatedPrevMonthDays.length);
    const calculatedNextMonthDays = Array.from({ length: daysFromNextMonth }, (_, i) => i + 1);

    return {
      currentMonth: memoizedCurrentMonth,
      prevMonth: memoizedPrevMonth,
      nextMonth: memoizedNextMonth,
      monthDays: calculatedMonthDays,
      prevMonthDays: calculatedPrevMonthDays,
      nextMonthDays: calculatedNextMonthDays,
      endPrevMonth: calculatedEndPrevMonth,
    };
  }, [view]);

  const changeMonth = (direction) => {
    const newView = { ...view };
    switch (direction) {
      case "prev":
        newView.month -= 1;
        if (newView.month < 0) {
          newView.month = 11;
          newView.year -= 1;
        }
        break;
      case "next":
        newView.month += 1;
        if (newView.month > 11) {
          newView.month = 0;
          newView.year += 1;
        }
        break;
      default:
        newView.month = moment().month();
        newView.year = moment().year();
    }

    setView(newView);
    setViewValue?.(`${newView.month + 1} / ${newView.year}`);
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <ApIcon icon={faAngleLeft} onClick={() => changeMonth("prev")} color="var(--primary-dark)" size={35} />
        <div className={styles.title} onClick={() => changeMonth("back")}>
          {title}
        </div>
        <ApIcon icon={faAngleRight} onClick={() => changeMonth("next")} color="var(--primary-dark)" size={35} />
      </div>
      <div className={styles.body} id={`${view.month} - ${view.year}`}>
        {weekDays.map((eachWeekDay, index) => (
          <CalendarCell key={`${eachWeekDay}-${index}`} label={eachWeekDay} />
        ))}
        {prevMonthDays.map((eachDay, index) => {
          const date = prevMonth.clone().date(eachDay);
          const isToday = date.isSame(today, "day");
          const isSelected = date.isSame(value, "day");

          return (
            <CalendarCell
              key={`prev-${eachDay}-${index}`}
              label={eachDay}
              outMonth
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => {
                setValue?.(date);
                onChange?.(date);
              }}
            />
          );
        })}
        {Array.from({ length: monthDays }, (_, i) => {
          const date = currentMonth.clone().date(i + 1);
          const isToday = date.isSame(today, "day");
          const isSelected = date.isSame(value, "day");

          return (
            <CalendarCell
              key={`current-${i + 1}`}
              label={i + 1}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => {
                setValue?.(date);
                onChange?.(date);
              }}
            />
          );
        })}
        {nextMonthDays.map((eachDay, index) => {
          const date = nextMonth.clone().date(eachDay);
          const isToday = date.isSame(today, "day");
          const isSelected = date.isSame(value, "day");

          return (
            <CalendarCell
              key={`next-${eachDay}-${index}`}
              label={eachDay}
              outMonth
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => {
                setValue?.(date);
                onChange?.(date);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ApCalendar;
