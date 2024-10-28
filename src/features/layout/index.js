import { Outlet } from "react-router";
import SidePanel from "./SidePanel/SidePanel";
import Navbar from "./Navbar/Navbar";
import styles from "./index.module.scss";

const Layout = () => {
  return (
    <main className={styles.mainLayout}>
      <SidePanel />
      <div className={styles.appContent}>
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
