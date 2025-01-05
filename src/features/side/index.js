import { useState } from "react";
import { ApCollapse } from "components";
import Calendar from "./Calendar/Calendar";
import styles from "./index.module.scss";
import SideDivider from "./SideDivider/SideDivider";
import TimeClock from "./TimeClock/TimeClock";
import YourPlans from "./YourPlans/YourPlans";

const SideBar = () => {
  const [collapseClock, setCollapseClock] = useState(false);
  const [collapseCalendar, setCollapseCalendar] = useState(false);

  return (
    <aside className={styles.side}>
      <ApCollapse collapsed={collapseClock} vertical height="195px">
        <TimeClock />
      </ApCollapse>
      <SideDivider collapse={collapseClock} setCollapse={setCollapseClock} />
      <ApCollapse collapsed={collapseCalendar} vertical height="350px" width="80%">
        <Calendar />
      </ApCollapse>
      <SideDivider collapse={collapseCalendar} setCollapse={setCollapseCalendar} />
      <YourPlans />
    </aside>
  );
};

export default SideBar;
