/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { ApEdit, ApIcon, ColorPicker } from "components";
import { faPalette, faPen, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useStoreNotes } from "store";
import { useShallow } from "zustand/react/shallow";
import { useCardStyle, useTargetClickOutside } from "hooks";
import styles from "./PlanCard.module.scss";

const PlanCard = ({ at, name, description, count, color, important }) => {
  const cardRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState({
    name,
    description,
    color,
  });

  const { updateNote, deleteNote } = useStoreNotes(
    useShallow((state) => ({ updateNote: state.updateNote, deleteNote: state.deleteNote }))
  );
  const updatePlanCard = (e) => {
    e?.stopPropagation();
    updateNote("plans", at, data);
    setIsFocus(false);
    setIsEdit(false);
  };

  const cardStyles = useCardStyle({ isHover, isFocus, color, important, preview });
  useTargetClickOutside(cardRef, () => () => setIsFocus(false));

  return (
    <div
      ref={cardRef}
      className={styles.card}
      style={cardStyles}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => setIsFocus(true)}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsEdit(true);
        setIsFocus(true);
      }}
    >
      <div className={styles.fieldsWrapper}>
        <ApEdit
          type="name"
          isEdit={isEdit}
          value={data.name}
          setValue={(v) => setData({ ...data, name: v })}
          onConfirm={updatePlanCard}
          placeholder="Change your plan?"
        />
        <ApEdit
          type="description"
          isEdit={isEdit}
          value={data.description}
          setValue={(v) => setData({ ...data, description: v })}
          onConfirm={updatePlanCard}
          placeholder="New aboout it?"
        />
      </div>
      <div className={styles.countWrapper} style={{ backgroundColor: cardStyles.backgroundColor, right: isEdit ? 10 : 15 }}>
        {isEdit && <ApIcon icon={faPlay} size={30} color="var(--text)" onClick={updatePlanCard} />}
        {!isHover && !isEdit && count && <div className={styles.count}>{count}</div>}
        {(isHover || isFocus) && !isEdit && (
          <ApIcon
            icon={faXmark}
            size={35}
            color="var(--text)"
            onClick={(e) => {
              e.preventDefault();
              deleteNote("plans", at);
            }}
            style={{ width: 25 }}
          />
        )}
        {isFocus && !isEdit && (
          <>
            <ColorPicker
              color={data.color}
              setColor={(c) => setData({ ...data, color: c })}
              setPreview={setPreview}
              paletteSize={22}
            />
            <ApIcon icon={faPen} size={22} color="var(--text)" onClick={() => setIsEdit(true)} />
          </>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
