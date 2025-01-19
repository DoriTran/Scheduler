import { ApEdit, ApIcon, ColorPicker } from "components";
import { faPen, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useStoreNotes } from "store";
import { useShallow } from "zustand/react/shallow";
import { useCardStatus, useCardStyles, useTargetClickOutside } from "hooks";
import { useRef } from "react";
import styles from "./PlanCard.module.scss";

// cardData: name, description, color, important, count
const PlanCard = ({ at, ...cardData }) => {
  const { cardRef, status, data, visible, updateStatus, updateData } = useCardStatus(cardData);

  const { updateNote, deleteNote } = useStoreNotes(
    useShallow((state) => ({ updateNote: state.updateNote, deleteNote: state.deleteNote }))
  );
  const updatePlanCard = (e, newData) => {
    e?.stopPropagation();
    updateNote("plans", at, { ...data, ...newData });
    updateData({ ...data, ...newData });
    updateStatus({ isEdit: false, isFocus: false });
  };

  const cardStyles = useCardStyles({ ...status, ...data });
  useTargetClickOutside(cardRef, () => updateStatus({ isFocus: false }));

  return (
    <div
      ref={cardRef}
      className={styles.card}
      style={cardStyles}
      onMouseEnter={() => updateStatus({ isHover: true })}
      onMouseLeave={() => updateStatus({ isHover: false })}
      onClick={() => updateStatus({ isFocus: true })}
      onDoubleClick={(e) => updatePlanCard(e, { important: !data.important })}
      onContextMenu={(e) => {
        e.preventDefault();
        updateStatus({ isEdit: true, isFocus: true });
      }}
    >
      <div className={styles.fields}>
        <ApEdit
          type="name"
          isEdit={status.isEdit}
          value={data.name}
          setValue={(v) => updateData({ name: v })}
          onConfirm={updatePlanCard}
          onCancel={() => updateStatus({ isEdit: false })}
          placeholder="Change your plan?"
          infoColor={cardStyles.color}
        />
        <ApEdit
          type="description"
          isEdit={status.isEdit}
          value={data.description}
          setValue={(v) => updateData({ description: v })}
          onConfirm={updatePlanCard}
          onCancel={() => updateStatus({ isEdit: false })}
          placeholder="New aboout it?"
          infoColor={cardStyles.color}
        />
      </div>
      <div
        className={styles.actions}
        style={{
          backgroundColor: cardStyles.backgroundColor,
          transition: cardStyles.transition,
          right: status.isEdit ? 10 : 15,
        }}
      >
        {visible.showUpdate && <ApIcon icon={faPlay} size={30} color={cardStyles.color} onClick={updatePlanCard} />}
        {visible.showCount && <div className={styles.count}>{cardData.count}</div>}
        {visible.showDelete && (
          <ApIcon
            icon={faXmark}
            size={35}
            color={cardStyles.color}
            onClick={(e) => {
              e.preventDefault();
              deleteNote("plans", at);
            }}
            style={{ width: 25 }}
          />
        )}
        {visible.showColorAndEdit && (
          <>
            <ColorPicker
              isOpen={status.isColor}
              setOpen={(isColorValue) => updateStatus({ isColor: isColorValue })}
              color={data.color}
              setPreview={(previewValue) => updateStatus({ preview: previewValue })}
              onSelect={updatePlanCard}
              paletteSize={22}
              paletteColor={cardStyles.color}
            />
            <ApIcon icon={faPen} size={22} color={cardStyles.color} onClick={() => updateStatus({ isEdit: true })} />
          </>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
