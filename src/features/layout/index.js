import { Outlet } from "react-router";
import { DragDropContext } from "react-beautiful-dnd";
import SidePanel from "./SidePanel/SidePanel";
import Navbar from "./Navbar/Navbar";
import styles from "./index.module.scss";

const Layout = () => {
  return (
    <DragDropContext>
      <main className={styles.mainLayout}>
        <SidePanel />
        <div className={styles.appContent}>
          <Navbar />
          <Outlet />
        </div>
      </main>
    </DragDropContext>
  );
};

export default Layout;
