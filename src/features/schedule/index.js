import styles from "./index.module.scss";
import WeekView from "./week/WeekView";

const MonthView = <div>MonthView</div>;
const YearView = <div>YearView</div>;

const Schedule = () => {
  const view = "week";

  return (
    <div className={styles.container}>
      {view === "week" && <WeekView />}
      {view === "month" && <MonthView />}
      {view === "year" && <YearView />}
    </div>
  );
};

export default Schedule;
