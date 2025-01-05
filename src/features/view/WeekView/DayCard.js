import { useStoreNotes, useStoreView, useStoreConfig } from "store";
import { useState } from "react";
import { useMemoTime } from "hooks";
import moment from "moment";
import { NoteCard } from "../components";
import styles from "./WeekView.module.scss";

const DayCard = ({ date }) => {
  const [isHover, setIsHover] = useState(false);
  const notes = useStoreNotes((state) => state.notes[`${date.day}${date.month + 1}${date.year}`]) || [];
  const setViewValue = useStoreView((state) => state.setViewValue);
  const setView = useStoreConfig((state) => state.setView);
  const isToday = useMemoTime(() => moment(date).isSame(moment(), "day"), [date], "m");

  // Open day view
  const handleOpenDayView = () => {
    setViewValue(date);
    setView("day");
  };

  return (
    <div className={styles.dayCard} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div
        className={styles.header}
        {...(isToday && { style: { background: "linear-gradient(to bottom, var(--primary) 20%, var(--background) 60%)" } })}
      >
        <div className={styles.rotateWrapper}>
          <div className={styles.todayIndicator} {...(!isToday && { style: { display: "none" } })} />
          <div className={styles.diamondBox} onClick={handleOpenDayView}>
            <div className={styles.day}>{date.day}</div>
          </div>
        </div>
        <div className={styles.dayBody}>{date.weekDay}</div>
      </div>
      <div className={styles.body}>
        {notes.map((note) => (
          <NoteCard key={`${date.day}${date.month}${date.year}-${note.from}`} {...note} />
        ))}
      </div>
    </div>
  );
};

export default DayCard;
