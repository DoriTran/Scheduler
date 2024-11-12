import { faSun } from "@fortawesome/free-regular-svg-icons";
import { ApIcon } from "components";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./NoteCard.module.scss";

const NoteCard = ({ day, at, name, decription, time, color, important }) => {
  // Style logic
  const [hover, setHover] = useState(false);
  const cardStyle = useMemo(() => {
    if (hover) return { backgroundColor: `var(--${color}-highlight)`, color: "var(--text)" };
    if (important) return { backgroundColor: `var(--${color}-important)`, color: "var(--text-constrast)" };
    return { backgroundColor: `var(--${color}-pastel)`, color: "var(--text)" };
  }, [hover, important]);
  const timeStamp = useMemo(() => `${time.slice(0, 2)}:${time.slice(2)}`, [time]);

  // Drag logic
  const cardRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  // useEffect(() => {
  //   if (!cardRef.current) return;

  //   return draggable({
  //     element: cardRef.current,
  //     getInitialData: () => ({ day, at }),
  //     onDragStart: () => setDragging(true),
  //     onDrop: () => setDragging(false),
  //   });
  // }, [day, at]);

  return (
    <div
      ref={cardRef}
      className={clsx(styles.card, { [styles.cardDragging]: dragging })}
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.decription}>{decription}</div>
      </div>
      <div className={styles.time}>
        {timeStamp} <ApIcon icon={faSun} size="1.25rem" />
      </div>
    </div>
  );
};

export default NoteCard;
