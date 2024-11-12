import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStoreNotes = create(
  persist(
    (set) => ({
      allNotes: {},

      addNote: (day, newNote) =>
        set((state) => ({
          allNotes: {
            ...state.allNotes,
            [day]: [...(state.allNotes[day] || []), newNote].sort((a, b) => a.time - b.time),
          },
        })),

      updateNote: (day, at, newNote) =>
        set((state) => ({
          allNotes: {
            ...state.allNotes,
            [day]: state.allNotes[day]
              ? [...state.allNotes[day].slice(0, at), newNote, ...state.allNotes[day].slice(at + 1)].sort(
                  (a, b) => a.time - b.time
                )
              : [],
          },
        })),

      deleteNote: (day, at) =>
        set((state) => ({
          allNotes: {
            ...state.allNotes,
            [day]: state.allNotes[day]
              ? state.allNotes[day].filter((_, index) => index !== at).sort((a, b) => a.time - b.time)
              : [],
          },
        })),

      moveNote: (from, to, at) =>
        set((state) => {
          const noteToMove = state.allNotes[from]?.[at];
          if (!noteToMove) return state;

          const updatedSource = state.allNotes[from].filter((_, index) => index !== at);
          const updatedDestination = [...(state.allNotes[to] || []), noteToMove].sort((a, b) => a.time - b.time);

          return {
            allNotes: {
              ...state.allNotes,
              [from]: updatedSource,
              [to]: updatedDestination,
            },
          };
        }),
    }),
    {
      name: "notes",
    }
  )
);

export default useStoreNotes;
