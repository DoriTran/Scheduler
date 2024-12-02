import Calendar from "./Calendar/Calendar";
import styles from "./index.module.scss";
import SideDivider from "./SideDivider/SideDivider";
import TimeClock from "./TimeClock/TimeClock";
import YourPlans from "./YourPlans/YourPlans";

const SideBar = () => {
  return (
    <aside className={styles.side}>
      <TimeClock />
      <SideDivider />
      <Calendar />
      <SideDivider />
      <YourPlans />
    </aside>
  );
};

export default SideBar;
