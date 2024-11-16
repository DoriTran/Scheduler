import { ApIcon } from "components";
import { useStoreConfig } from "store";
import { useShallow } from "zustand/react/shallow";
import { useCurrentTime, useTimePeriod } from "hooks";
import clsx from "clsx";
import styles from "./Watch.module.scss";
import css from "../../index.module.scss";

const Watch = () => {
  const { ampm, switchAmPm } = useStoreConfig(useShallow((state) => ({ ampm: state.ampm, switchAmPm: state.switchAmPm })));
  const hhmmTime = useCurrentTime(ampm ? "hh:mm" : "HH:mm");
  const ampmTime = useCurrentTime("A");
  const period = useTimePeriod();

  return (
    <div className={clsx(styles.timeWrapper, css.cardWrapper)}>
      <div className={styles.period}>
        <ApIcon period={period} color={`var(--${period})`} size="60px" />
      </div>
      <div className={styles.time} onClick={() => switchAmPm()}>
        <div className={styles.hhmm}>{hhmmTime}</div>
        {ampm && <div className={styles.ampm}>{ampmTime}</div>}
      </div>
    </div>
  );
};

export default Watch;
