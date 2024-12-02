import styles from "./index.module.scss";
import NavBar from "./nav";
import SideBar from "./side";
import View from "./view";

const Schedule = () => {
  return (
    <div className={styles.page}>
      <SideBar />
      <div className={styles.view}>
        <NavBar />
        <View />
      </div>
    </div>
  );
};

export default Schedule;
