import { useStoreNotes, useStoreView, useStoreConfig } from "store";
import { Fragment, useState } from "react";
import { useMemoTime } from "hooks";
import moment from "moment";
import { NoteCard, TimeGap } from "../components";
import styles from "./WeekView.module.scss";

const DayCard = ({ date, dateString }) => {
  const [isHover, setIsHover] = useState(false);
  const notes = useStoreNotes((state) => state.notes[dateString]) || [];
  const addNote = useStoreNotes((state) => state.addNote);
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
        {notes.map((note, index) => (
          <Fragment key={`${date.day}${date.month}${date.year}-card: ${index}`}>
            <NoteCard at={index} date={date} dateString={dateString} {...note} />
            {index !== notes.length - 1 && (
              <TimeGap from={note.to} to={notes[index + 1]?.from} onClick={() => addNote(dateString, { from: note.to })} />
            )}
          </Fragment>
        ))}
        {isHover && <TimeGap plus onClick={() => addNote(dateString, { from: notes[notes.length - 1]?.to || "00:00" })} />}
      </div>
    </div>
  );
};

export default DayCard;
