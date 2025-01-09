import { useState } from "react";
import { ApCollapse, ApScrollbar } from "components";
import Calendar from "./Calendar/Calendar";
import styles from "./index.module.scss";
import SideDivider from "./SideDivider/SideDivider";
import TimeClock from "./TimeClock/TimeClock";
import YourPlans from "./YourPlans/YourPlans";

const SideBar = () => {
  const [collapseClock, setCollapseClock] = useState(false);
  const [collapseCalendar, setCollapseCalendar] = useState(false);

  return (
    <ApScrollbar hidden className={styles.side}>
      <ApCollapse collapsed={collapseClock} vertical minHeight="195px">
        <TimeClock />
      </ApCollapse>
      <SideDivider collapse={collapseClock} setCollapse={setCollapseClock} />
      <ApCollapse collapsed={collapseCalendar} vertical minHeight="350px" width="80%">
        <Calendar />
      </ApCollapse>
      <SideDivider collapse={collapseCalendar} setCollapse={setCollapseCalendar} />
      <YourPlans />
    </ApScrollbar>
  );
};

export default SideBar;
