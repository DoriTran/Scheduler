import moment from "moment";
import { useMemo } from "react";
import { useStoreView } from "store";
import { getMomentAsObject } from "utils";
import DayCard from "./DayCard";
import styles from "./WeekView.module.scss";

const WeekView = () => {
  const viewValue = useStoreView((state) => state.viewValue);
  const weekDays = useMemo(() => {
    const startOfWeek = moment(viewValue).startOf("isoWeek");
    return Array.from({ length: 7 }, (_, index) => {
      const day = startOfWeek.clone().add(index, "days");
      return {
        date: getMomentAsObject(day),
        dateString: day.format("DD/MM/YYYY"),
      };
    });
  }, [viewValue]);

  return (
    <div className={styles.weekView}>
      {weekDays.map((eachWeekDay) => (
        <DayCard key={`${eachWeekDay.date.day}-${eachWeekDay.date.month}-${eachWeekDay.date.year}`} {...eachWeekDay} />
      ))}
    </div>
  );
};

export default WeekView;
