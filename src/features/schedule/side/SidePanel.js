import { useTimePeriod } from "hooks";
import Watch from "./Watch/Watch";
import Calendar from "./Calendar/Calendar";
import Plans from "./Plans/Plans";
import styles from "./SidePanel.module.scss";

const SidePanel = () => {
  const period = useTimePeriod();

  return (
    <div className={styles.sidePanelContainer} style={{ backgroundColor: `var(--${period}-pastel)` }}>
      <Watch />
      <Calendar />
      <Plans />
    </div>
  );
};

export default SidePanel;
