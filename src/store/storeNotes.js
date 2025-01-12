import { create } from "zustand";
import { persist } from "zustand/middleware";

const asNum = (time) => parseInt(time.replace(":", ""), 10);
const sortNote = (a, b) => {
  return asNum(a.from) - asNum(b.from);
};

const useStoreNotes = create(
  persist(
    (set) => ({
      notes: {},
      plans: [],
      daily: [],

      addNote: (to, newNote) =>
        set((state) => {
          if (to === "plans") return { ...state, plans: [newNote, ...state.plans] };
          if (to === "daily") return { ...state, daily: [newNote, ...state.daily] };
          return {
            ...state,
            notes: {
              ...state.notes,
              [to]: [...(state.notes[to] || []), newNote].sort(sortNote),
            },
          };
        }),

      updateNote: (to, at, newNote) =>
        set((state) => {
          if (to === "plans") return { ...state, plans: [...state[to].slice(0, at), newNote, ...state[to].slice(at + 1)] };
          if (to === "daily") return { ...state, daily: [...state[to].slice(0, at), newNote, ...state[to].slice(at + 1)] };
          return {
            notes: {
              ...state.notes,
              [to]: state.notes[to]
                ? [...state.notes[to].slice(0, at), newNote, ...state.notes[to].slice(at + 1)].sort(sortNote)
                : [newNote],
            },
          };
        }),

      deleteNote: (to, at) =>
        set((state) => {
          if (to === "plans") return { ...state, plans: state[to].filter((_, index) => index !== at) };
          if (to === "daily") return { ...state, daily: state[to].filter((_, index) => index !== at) };
          return {
            notes: {
              ...state.notes,
              [to]: state.notes[to] ? state.notes[to].filter((_, index) => index !== at).sort(sortNote) : [],
            },
          };
        }),

      moveNote: (from, to, at) =>
        set((state) => {
          // Check note to move
          const noteToMove = ((from === "plans" || from === "daily") && state[from][at]) || state.notes[from]?.[at];
          if (!noteToMove) return state;

          // Update source and destination
          state.deleteNote(from, at);
          state.addNote(to, noteToMove);

          return state;
        }),

      upCount: (at) =>
        set((state) => ({
          ...state,
          plans: [
            ...state.plans.slice(0, at),
            ...{ ...state.plans[at], count: state.plans[at].count + 1 || 1 },
            ...state.plans.slice(at + 1),
          ],
        })),
    }),
    {
      name: "notes",
    }
  )
);

export default useStoreNotes;
