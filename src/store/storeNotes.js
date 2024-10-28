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
    }),
    {
      name: "notes",
    }
  )
);

export default useStoreNotes;
