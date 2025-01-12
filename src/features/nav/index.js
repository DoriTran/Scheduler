import { useCurrentTime } from "hooks";
import MoveBtnByView from "./MoveBtnByView/MoveBtnByView";
import ViewSelection from "./ViewSelection/ViewSelection";
import ConfigSettings from "./ConfigSettings/ConfigSettings";
import styles from "./index.module.scss";

const NavBar = () => {
  const navMonthYear = useCurrentTime("MMMM YYYY", "m");

  return (
    <nav className={styles.nav}>
      <div className={styles.leftTitle}>{navMonthYear}</div>
      <div className={styles.rightAction}>
        <MoveBtnByView />
        <ViewSelection />
        <ConfigSettings />
      </div>
    </nav>
  );
};

export default NavBar;
