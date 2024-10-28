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

  const { notes, addNote } = useStoreNotes(
    useShallow((state) => ({ notes: state.allNotes["28/10/2024"], addNote: state.addNote }))
  );
  console.log(notes);

  useEffect(() => {
    if (!notes?.length) {
      addNote("28/10/2024", { name: "Test 1", time: "1030", description: "", color: "pink" });
      addNote("28/10/2024", { name: "Test 2", time: "1230", description: "Test description", color: "red" });
    }
  }, []);

  return (
    <div className={styles.dayContainer}>
      <div className={styles.numday} style={{ color: `var(--text${!isToday ? "-silver" : ""})` }}>
        {numday}
      </div>
      <div className={styles.weekday}>{weekday}</div>
      <div className={styles.noteWrapper}>
        {notes?.map((eachNote, index) => (
          <NoteCard key={`${day}-${eachNote.time}-${index}`} {...eachNote} />
        ))}
      </div>
    </div>
  );
};

export default DayTab;
