/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { ApEdit, ApIcon } from "components";
import { faPalette, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useStoreNotes } from "store";
import { useShallow } from "zustand/react/shallow";
import { useCardStyle } from "hooks";
import styles from "./PlanCard.module.scss";

const PlanCard = ({ at, name, description, count, color, important }) => {
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState({
    name,
    description,
  });

  const { updateNote, deleteNote } = useStoreNotes(
    useShallow((state) => ({ updateNote: state.updateNote, deleteNote: state.deleteNote }))
  );
  const updatePlanCard = () => updateNote("plans", at, data);

  const cardStyles = useCardStyle({ isHover, isFocus, color, important });

  return (
    <div
      className={styles.card}
      style={cardStyles}
      tabIndex={0}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    >
      <div className={styles.fieldsWrapper}>
        <ApEdit type="name" value={data.name} setValue={(v) => setData({ ...data, name: v })} onConfirm={updatePlanCard} />
        <ApEdit
          type="description"
          value={data.description}
          setValue={(v) => setData({ ...data, description: v })}
          onConfirm={updatePlanCard}
        />
      </div>
      <div className={styles.countWrapper}>
        {!isHover && count && <div className={styles.count}>{count}</div>}
        {(isHover || isFocus) && (
          <ApIcon
            icon={faXmark}
            size={35}
            color="var(--text)"
            onClick={() => deleteNote("plans", at)}
            style={{ width: 25 }}
          />
        )}
        {isFocus && (
          <>
            <ApIcon icon={faPalette} size={22} color="var(--text)" onClick={() => deleteNote("plans", at)} />
            <ApIcon icon={faPen} size={22} color="var(--text)" onClick={() => deleteNote("plans", at)} />
          </>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
