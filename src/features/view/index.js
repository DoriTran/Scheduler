import styles from "./index.module.scss";

const View = () => {
  const view = "week";
  return (
    <div className={styles.view}>
      {view === "day" && <DayView />}
      {view === "week" && <WeekView />}
      {view === "month" && <MonthView />}
    </div>
  );
};

export default View;
