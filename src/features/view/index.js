import { useStoreConfig } from "store";
import DayView from "./DayView/DayView";
import WeekView from "./WeekView/WeekView";
import styles from "./index.module.scss";

const View = () => {
  const view = useStoreConfig((state) => state.view);

  return (
    <div className={styles.view}>
      {view === "day" && <DayView />}
      {view === "week" && <WeekView />}
    </div>
  );
};

export default View;
