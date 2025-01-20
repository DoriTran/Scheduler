import { ApIcon, ApTooltip } from "components";
import styles from "./PlusGap.module.scss";

const PlusGap = ({ finalTimeOfDay, dateString, addNote, isShow }) => {
  return (
    <div className={styles.plusGap} style={{ opacity: isShow ? 1 : 0 }}>
      <ApTooltip
        refWrap={{
          className: styles.iconWrapper,
        }}
        tooltip="Create note?"
      >
        <ApIcon
          period="plus"
          size={18}
          color="var(--text-low)"
          onClick={() => addNote(dateString, { from: finalTimeOfDay || "00:00" })}
        />
      </ApTooltip>
    </div>
  );
};

export default PlusGap;
