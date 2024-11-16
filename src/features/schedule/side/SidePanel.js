import Watch from "./Watch/Watch";
import Calendar from "./Calendar/Calendar";
import Plans from "./Plans/Plans";
import styles from "./SidePanel.module.scss";

const SidePanel = () => {
  return (
    <div className={styles.sidePanelContainer}>
      <Watch />
      <Calendar />
      <Plans />
    </div>
  );
};

export default SidePanel;
