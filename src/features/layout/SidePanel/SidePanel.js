import styles from "./SidePanel.module.scss";

const SidePanel = () => {
  return (
    <aside className={styles.container}>
      <div className={styles.title}>Calendar</div>
      <div className={styles.title}>Plan</div>
    </aside>
  );
};

export default SidePanel;
