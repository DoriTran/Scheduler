import { useMemo, useState } from "react";
import { useStoreConfig, useStoreView } from "store";
import { ApIcon } from "components";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getDateSuffix, getMomentAsObject, getMonthThatWeekBelongTo } from "utils";
import { useShallow } from "zustand/react/shallow";
import moment from "moment";
import styles from "./MoveBtnByView.module.scss";

const MoveBtnByView = () => {
  const view = useStoreConfig((state) => state.view);
  const { value, setValue } = useStoreView(
    useShallow((state) => ({ value: state.viewValue, setValue: state.setViewValue }))
  );

  const next = () => setValue(getMomentAsObject(moment(value).add(view === "day" ? 1 : 7, "day")));
  const back = () => setValue(getMomentAsObject(moment(value).subtract(view === "day" ? 1 : 7, "day")));

  const { upper, main } = useMemo(() => {
    // Day view
    if (view === "day") return { main: `${value.day}${getDateSuffix(value.day)} ${moment(value).format("MMM")}` };
    // Week view
    const upperMonth = getMonthThatWeekBelongTo(moment(value));
    const firstWeek = upperMonth.startOf("month").isoWeekday() <= 4 ? upperMonth : upperMonth.add(1, "week");
    const firstMonday = firstWeek.clone().startOf("isoWeek");
    const daysFromFirstMonday = moment(value).diff(firstMonday, "days");
    const weekOfMonth = Math.floor(daysFromFirstMonday / 7) + 1;

    return {
      upper: upperMonth.format("MMMM"),
      main: `${weekOfMonth}${getDateSuffix(weekOfMonth)} week`,
    };
  }, [value, view]);

  return (
    <div className={styles.moveBtnByView}>
      <ApIcon icon={faAngleLeft} onClick={back} color="var(--primary-dark)" size={30} />
      <div className={styles.currentValue}>
        {upper && <div className={styles.upper}>{upper}</div>}
        <div className={styles.main}>{main}</div>
      </div>
      <ApIcon icon={faAngleRight} onClick={next} color="var(--primary-dark)" size={30} />
    </div>
  );
};

export default MoveBtnByView;
