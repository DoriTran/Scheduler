import { useStoreConfig } from "store";
import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";
import styles from "./ViewSelection.module.scss";

/**
 * Add more item: change totalIndicator, update left umm, update style by total * 100 - left position
 */

const ViewSelection = () => {
  const { view, setView } = useStoreConfig(useShallow((state) => ({ view: state.view, setView: state.setView })));
  const left = useMemo(() => (view === "day" ? 0 : 100), [view]);

  return (
    <div className={styles.viewSelection}>
      <div className={styles.indicator} style={{ left }}>
        <div className={styles.item} style={{ left: 0 - left }}>
          Day
        </div>
        <div className={styles.item} style={{ left: 100 - left }}>
          Week
        </div>
      </div>
      <div className={styles.item} onClick={() => setView("day")}>
        Day
      </div>
      <div className={styles.item} onClick={() => setView("week")}>
        Week
      </div>
    </div>
  );
};

export default ViewSelection;
