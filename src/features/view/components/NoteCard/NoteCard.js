import { ApIcon } from "components";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { getPeriodByTime } from "utils";
import moment from "moment";
import ColorPicker from "./ColorPicker";
import styles from "./NoteCard.module.scss";

const NoteCard = ({ from, to, name, description, color, important }) => {
  const [isHover, setIsHover] = useState(false);
  const [previewColor, setPreviewColor] = useState(null);
  const rangePeriod = useMemo(() => {
    return getPeriodByTime(moment(from, "HH:mm"));
  }, [from]);
  const cardStyle = useMemo(() => {
    return {
      backgroundColor: `var(--${previewColor || color}-${
        (isHover && "highlight") || (important && "important") || "pastel"
      })`,
      color: `var(--${((isHover || !important) && "text") || (important && "text-contrast")}`,
    };
  }, [isHover, color, important]);

  return (
    <div
      className={styles.noteCard}
      style={cardStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={styles.timeRange}>
        <ApIcon period={rangePeriod} size={16} />
        {from}
        <ApIcon icon={faCaretRight} size={5} />
        {to}
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.description}>{description}</div>
      <ColorPicker isCardHover={isHover} color={color} preview={previewColor} setPreview={setPreviewColor} />
    </div>
  );
};

export default NoteCard;
