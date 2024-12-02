import styles from "./index.module.scss";
import MoveBtnByView from "./MoveBtnByView/MoveBtnByView";
import ViewSelection from "./ViewSelection/ViewSelection";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.leftTitle}>November 2024</div>
      <div className={styles.rightAction}>
        <MoveBtnByView />
        <ViewSelection />
      </div>
    </nav>
  );
};

export default NavBar;
