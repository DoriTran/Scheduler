import { ApEdit, ApIcon, ColorPicker, TimePicker } from "components";
import { faCaretRight, faPen, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const rangePeriod = useMemo(() => {
    return getPeriodByTime(moment(cardData.from, "HH:mm"));
  }, [cardData.from]);

  const { updateNote, deleteNote } = useStoreNotes(
    useShallow((state) => ({ updateNote: state.updateNote, deleteNote: state.deleteNote }))
  );
  const updatePlanCard = (e, newData, keepEdit) => {
    e?.stopPropagation();
    updateNote(dateString, at, { ...data, ...newData });
    updateData({ ...data, ...newData });
    if (!keepEdit) updateStatus({ isEdit: false, isHover: false, isFocus: false });
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
      <div className={styles.timeRange}>
        <div
          className={styles.periodIcon}
          onMouseEnter={() => setIsHoverPeriod(true)}
          onMouseLeave={() => setIsHoverPeriod(false)}
        >
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
        <TimePicker
          isOpen={status.isFrom}
          setOpen={(isFromValue) => updateStatus({ isFrom: isFromValue })}
          value={data.from}
          setValue={(v) => updatePlanCard(null, { from: v }, true)}
          infoColor={cardStyles.color}
          disabled={!status.isEdit}
        />
        {(data.to || status.isHover) && (
          <ApIcon
            icon={faCaretRight}
            size={12}
            color={cardStyles.color}
            style={{ width: 10 }}
            {...(!data.to && { onClick: (e) => updatePlanCard(e, { to: data.from }) })}
          />
        )}
        <TimePicker
          isOpen={status.isTo}
          setOpen={(isToValue) => updateStatus({ isTo: isToValue })}
          value={data.to}
          setValue={(v) => updatePlanCard(null, { to: v }, true)}
          infoColor={cardStyles.color}
          disabled={!status.isEdit}
        />
      </div>
      <ApEdit
        type="name"
        isEdit={status.isEdit}
        value={data.name}
        setValue={(v) => updateData({ name: v })}
        onConfirm={updatePlanCard}
        onCancel={() => updateStatus({ isEdit: false })}
        placeholder="Note?"
      />
      <ApEdit
        type="description"
        isEdit={status.isEdit}
        value={data.description}
        setValue={(v) => updateData({ description: v })}
        onCancel={() => updateStatus({ isEdit: false })}
        onConfirm={updatePlanCard}
        placeholder="Aboout it?"
      />
      {visible.showActions && (
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
          {status.isEdit && <ApIcon icon={faPlay} size={16} color={cardStyles.color} onClick={updatePlanCard} />}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
