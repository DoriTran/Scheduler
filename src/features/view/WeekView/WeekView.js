import moment from "moment";
import { useMemo } from "react";
import { useStoreView } from "store";
import { getMomentAsObject } from "utils";
import DayCard from "./DayCard";
import styles from "./WeekView.module.scss";

const WeekView = () => {
  const viewValue = useStoreView((state) => state.viewValue);
  const weekDays = useMemo(() => {
    const startOfWeek = moment(viewValue).startOf("week").add(1, "day");
    return Array.from({ length: 7 }, (_, index) => getMomentAsObject(startOfWeek.clone().add(index, "days")));
  }, [viewValue]);

  return (
    <div className={styles.weekView}>
      {weekDays.map((eachWeekDay) => (
        <DayCard key={`${eachWeekDay.day}-${eachWeekDay.month}-${eachWeekDay.year}`} date={eachWeekDay} />
      ))}
    </div>
  );
};

export default WeekView;
