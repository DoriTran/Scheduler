import { useTimePeriod } from "hooks";
import styles from "./index.module.scss";
import SidePanel from "./side/SidePanel";
import WeekView from "./week/WeekView";

const MonthView = <div>MonthView</div>;
const YearView = <div>YearView</div>;

const Schedule = () => {
  const view = "week";
  const period = useTimePeriod();

  return (
    <div className={styles.container} style={{ backgroundColor: `var(--${period}-pastel)` }}>
      <SidePanel />
      {/* {view === "week" && <WeekView />} */}
      {view === "month" && <MonthView />}
      {view === "year" && <YearView />}
    </div>
  );
};

export default Schedule;
