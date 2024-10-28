import { faSun } from "@fortawesome/free-regular-svg-icons";
import { ApIcon } from "components";
import { useMemo, useState } from "react";
import styles from "./NoteCard.module.scss";

const NoteCard = ({ name, decription, time, color, important }) => {
  // Style logic
  const [hover, setHover] = useState(false);
  const cardStyle = useMemo(() => {
    if (hover) return { backgroundColor: `var(--${color}-highlight`, color: "var(--text)" };
    if (important) return { backgroundColor: `var(--${color}-important`, color: "var(--text-constrast)" };
    return { backgroundColor: `var(--${color}-pastel`, color: "var(--text)" };
  }, []);

  // // Edit logic
  // const [infoEditing, setInfoEditing] = useState([]);

  return (
    <div
      className={styles.card}
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.decription}>{decription}</div>
      </div>
      <div className={styles.time}>
        {time} <ApIcon icon={faSun} />
      </div>
    </div>
  );
};

export default NoteCard;
