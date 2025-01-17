import { ApEdit, ApIcon, ColorPicker } from "components";
import { faCaretRight, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { getPeriodByTime } from "utils";
import moment from "moment";
import { useCardStatus, useCardStyles, useTargetClickOutside } from "hooks";
import { useStoreNotes } from "store";
import { useShallow } from "zustand/react/shallow";
import styles from "./NoteCard.module.scss";

// cardData: from, to, name, description, color, important, count
const NoteCard = ({ at, date, dateString, ...cardData }) => {
  const { cardRef, status, data, visible, updateStatus, updateData } = useCardStatus(cardData);
  const [isHoverPeriod, setIsHoverPeriod] = useState(false);

  const { updateNote, deleteNote } = useStoreNotes(
    useShallow((state) => ({ updateNote: state.updateNote, deleteNote: state.deleteNote }))
  );
  const updatePlanCard = (e, newData) => {
    e?.stopPropagation();
    updateNote(dateString, at, { ...data, ...newData });
    updateData({ ...data, ...newData });
    updateStatus({ isEdit: false, isFocus: false });
  };

  const cardStyles = useCardStyles({ ...status, ...data });
  useTargetClickOutside(cardRef, () => updateStatus({ isFocus: false }));

  const rangePeriod = useMemo(() => {
    return getPeriodByTime(moment(cardData.from, "HH:mm"));
  }, [cardData.from]);

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
      <div className={styles.timeRange}>
        <div onMouseEnter={() => setIsHoverPeriod(true)} onMouseLeave={() => setIsHoverPeriod(false)}>
          <ApIcon
            {...(isHoverPeriod ? { icon: faXmark } : { period: rangePeriod })}
            size={16}
            color={cardStyles.color}
            onClick={(e) => {
              e.preventDefault();
              deleteNote(dateString, at);
            }}
            style={{ width: 16 }}
          />
        </div>
        {cardData.from}
        <ApIcon icon={faCaretRight} size={12} color={cardStyles.color} style={{ width: 10 }} />
        {cardData.to}
      </div>
      <ApEdit
        type="name"
        isEdit={status.isEdit}
        value={data.name}
        setValue={(v) => updateData({ name: v })}
        onConfirm={updatePlanCard}
        placeholder="Note?"
      />
      <ApEdit
        type="description"
        isEdit={status.isEdit}
        value={data.description}
        setValue={(v) => updateData({ description: v })}
        onConfirm={updatePlanCard}
        placeholder="Aboout it?"
      />
      <div
        className={styles.actions}
        style={{ backgroundColor: cardStyles.backgroundColor, transition: cardStyles.transition }}
      >
        {visible.showColorAndEdit && (
          <>
            <ColorPicker
              isOpen={status.isColor}
              setOpen={(isColorValue) => updateStatus({ isColor: isColorValue })}
              color={data.color}
              setPreview={(previewValue) => updateStatus({ preview: previewValue })}
              onSelect={updatePlanCard}
              paletteSize={16}
              paletteColor={cardStyles.color}
            />
            <ApIcon icon={faPen} size={16} color={cardStyles.color} onClick={() => updateStatus({ isEdit: true })} />
          </>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
