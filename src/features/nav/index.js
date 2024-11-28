import styles from "./index.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.leftTitle}>November 2024</div>
      <div className={styles.rightAction}>
        <MoveBtnByView />
        <ViewSelecton />
      </div>
    </nav>
  );
};

export default NavBar;
