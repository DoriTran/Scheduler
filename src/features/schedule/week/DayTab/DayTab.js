import moment from "moment";
import { useStoreNotes } from "store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useMemo } from "react";
import NoteCard from "../NoteCard/NoteCard";
import styles from "./DayTab.module.scss";

const DayTab = ({ day }) => {
  const { weekday, numday, isToday } = useMemo(() => {
    const current = moment(day, "DD/MM/YYYY");
    return {
      weekday: current.format("dddd"),
      numday: current.format("DD"),
      isToday: current.isSame(moment(), "day"),
    };
  }, [day]);

  const { notes, addNote, moveNote } = useStoreNotes(
    useShallow((state) => ({ notes: state.allNotes[day], addNote: state.addNote, moveNote: state.moveNote }))
  );

  useEffect(() => {
    if (!notes?.length) {
      addNote(day, { name: "A", time: "1030", description: "", color: "pink" });
      addNote(day, { name: "B", time: "1230", description: "Test description", color: "red" });
      addNote(day, { name: "C", time: "1230", description: "Test description", color: "green" });
    }
  }, []);

  return (
    <div className={styles.dayContainer}>
      <div className={styles.numday} style={{ color: `var(--text${!isToday ? "-silver" : ""})` }}>
        {numday}
      </div>
      <div className={styles.weekday} style={{ color: `var(--text${!isToday ? "-silver" : ""})` }}>
        {weekday}
      </div>
      <div className={styles.noteWrapper}>
        {notes?.map((eachNote, index) => (
          <NoteCard key={`${day}-${eachNote.time}-${index}`} day={day} at={index} {...eachNote} />
        ))}
      </div>
    </div>
  );
};

export default DayTab;
