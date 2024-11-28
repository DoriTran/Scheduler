import styles from "./index.module.scss";

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
