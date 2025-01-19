import { create } from "zustand";
import { persist } from "zustand/middleware";

const asNum = (time) => parseInt(time.replace(":", ""), 10);
const sortNote = (a, b) => asNum(a.from) - asNum(b.from);
const nextId = (arr) => ((!arr || arr.length === 0) && 1) || Math.max(...arr.map((item) => item.id)) + 1;

const useStoreNotes = create(
  persist(
    (set) => ({
      notes: {},
      plans: [],
      daily: [],

      addNote: (to, newNote) =>
        set((state) => {
          const newState = { ...state };
          if (to === "plans")
            return {
              ...newState,
              plans: [{ ...newNote, id: nextId(newState.plans) }, ...newState.plans],
            };
          if (to === "daily")
            return {
              ...newState,
              daily: [{ ...newNote, id: nextId(newState.daily) }, ...newState.daily],
            };
          return {
            ...state,
            notes: {
              ...newState.notes,
              [to]: [...(newState.notes[to] || []), { ...newNote, id: nextId(newState.notes[to]) }].sort(sortNote),
            },
          };
        }),

      updateNote: (to, updateNote) =>
        set((state) => {
          const { id } = updateNote;
          const newState = { ...state };
          if (to === "plans")
            return {
              ...newState,
              plans: newState.plans.map((note) => (note.id === id ? { ...note, ...updateNote } : note)),
            };
          if (to === "daily")
            return {
              ...newState,
              daily: newState.daily.map((note) => (note.id === id ? { ...note, ...updateNote } : note)),
            };
          return {
            ...newState,
            notes: {
              ...newState.notes,
              [to]: newState.notes[to]
                ? newState.notes[to].map((note) => (note.id === id ? { ...note, ...updateNote } : note)).sort(sortNote)
                : [],
            },
          };
        }),

      deleteNote: (to, deleteNote) =>
        set((state) => {
          const { id } = deleteNote;
          const newState = { ...state };
          if (to === "plans") return { ...newState, plans: newState.plans.filter((note) => note.id !== id) };
          if (to === "daily") return { ...newState, daily: newState.daily.filter((note) => note.id !== id) };
          return {
            ...newState,
            notes: {
              ...newState.notes,
              [to]: newState.notes[to] ? newState.notes[to].filter((note) => note.id !== id).sort(sortNote) : [],
            },
          };
        }),

      moveNote: (from, to, moveNote) =>
        set((state) => {
          const { id } = moveNote;
          const newState = { ...state };
          let noteToMove;

          // Find the note to move
          if (from === "plans") {
            noteToMove = newState.plans.find((note) => note.id === id);
            newState.plans = newState.plans.filter((note) => note.id !== id);
          } else if (from === "daily") {
            noteToMove = newState.daily.find((note) => note.id === id);
            newState.daily = newState.daily.filter((note) => note.id !== id);
          } else {
            noteToMove = newState.notes[from]?.find((note) => note.id === id);
            newState.notes[from] = newState.notes[from]
              ? newState.notes[from].filter((note) => note.id !== id).sort(sortNote)
              : [];
          }

          if (!noteToMove) return state;

          // Add the note to the destination with a new ID
          if (to === "plans") {
            newState.plans = [{ ...noteToMove, id: nextId(newState.plans) }, ...newState.plans];
          } else if (to === "daily") {
            newState.daily = [{ ...noteToMove, id: nextId(newState.daily) }, ...newState.daily];
          } else {
            newState.notes[to] = [...(newState.notes[to] || []), { ...noteToMove, id: nextId(newState.notes[to]) }].sort(
              sortNote
            );
          }

          return newState;
        }),
    }),
    {
      name: "notes",
    }
  )
);

export default useStoreNotes;
