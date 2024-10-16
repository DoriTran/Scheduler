import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <span>Monday - 10/12/2024 06:30</span>
      <span>Card name</span>
      <div className={styles.action}>12h/24h Week Config</div>
    </nav>
  );
};

export default Navbar;
