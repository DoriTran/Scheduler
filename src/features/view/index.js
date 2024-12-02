import DayView from "./DayView/DayView";
import WeekView from "./WeekView/WeekView";
import styles from "./index.module.scss";

const View = () => {
  const view = "week";
  return (
    <div className={styles.view}>
      {view === "day" && <DayView />}
      {view === "week" && <WeekView />}
    </div>
  );
};

export default View;
