/* eslint-disable max-len */
import { useStoreNotes, useStoreView, useStoreConfig } from "store";
import { Fragment, useState } from "react";
import { useMemoTime } from "hooks";
import moment from "moment";
import { ApDragDrop, useMonitor } from "components";
import { useShallow } from "zustand/react/shallow";
import { NoteCard, TimeGap } from "../components";
import styles from "./WeekView.module.scss";

const DayCard = ({ date, dateString }) => {
  const [isHover, setIsHover] = useState(false);
  const notes = useStoreNotes((state) => state.notes[dateString]) || [];
  const { addNote, moveNote } = useStoreNotes(useShallow((state) => ({ addNote: state.addNote, moveNote: state.moveNote })));
  const setViewValue = useStoreView((state) => state.setViewValue);
  const setView = useStoreConfig((state) => state.setView);
  const isToday = useMemoTime(() => moment(date).isSame(moment(), "day"), [date], "m");

  // Open day view
  const handleOpenDayView = () => {
    setViewValue(date);
    setView("day");
  };

  return (
    <ApDragDrop
      onCatch={({ source: { data } }) => {
        if (data.isDuplicate) addNote(dateString, data.data);
        else moveNote(data.date, dateString, data.at);
      }}
    >
      <div className={styles.dayCard} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <div
          className={styles.header}
          {...(isToday && {
            style: { background: "linear-gradient(to bottom, var(--primary) 20%, var(--background) 60%)" },
          })}
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
            <>
              <NoteCard at={index} date={date} dateString={dateString} {...note} />
              {index !== notes.length - 1 && (
                <TimeGap from={note.to} to={notes[index + 1]?.from} onClick={() => addNote(dateString, { from: note.to })} />
              )}
            </>
          ))}
          {isHover && <TimeGap plus onClick={() => addNote(dateString, { from: notes[notes.length - 1]?.to || "00:00" })} />}
        </div>
      </div>
    </ApDragDrop>
  );
};

export default DayCard;
