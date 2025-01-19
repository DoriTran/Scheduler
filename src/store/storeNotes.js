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
          const newState = { ...state };
          if (to === "plans")
            return {
              ...newState,
              plans: [...newState.plans.slice(0, at), newNote, ...newState.plans.slice(at + 1)],
            };
          if (to === "daily")
            return {
              ...newState,
              daily: [...newState.daily.slice(0, at), newNote, ...newState.daily.slice(at + 1)],
            };
          return {
            ...newState,
            notes: {
              ...newState.notes,
              [to]: newState.notes[to]
                ? [...newState.notes[to].slice(0, at), newNote, ...newState.notes[to].slice(at + 1)].sort(sortNote)
                : [newNote],
            },
          };
        }),

      deleteNote: (to, at) =>
        set((state) => {
          const newState = { ...state };
          if (to === "plans") return { ...newState, plans: newState.plans.filter((_, index) => index !== at) };
          if (to === "daily") return { ...newState, daily: newState.daily.filter((_, index) => index !== at) };
          return {
            ...newState,
            notes: {
              ...newState.notes,
              [to]: newState.notes[to] ? newState.notes[to].filter((_, index) => index !== at).sort(sortNote) : [],
            },
          };
        }),

      moveNote: (from, to, at) =>
        set((state) => {
          const noteToMove = ((from === "plans" || from === "daily") && state[from][at]) || state.notes[from]?.[at];
          if (!noteToMove) return state;

          // Create new state for immutability
          const newState = { ...state };

          // Remove from source
          if (from === "plans") {
            newState.plans = state.plans.filter((_, index) => index !== at);
          } else if (from === "daily") {
            newState.daily = state.daily.filter((_, index) => index !== at);
          } else {
            newState.notes = {
              ...state.notes,
              [from]: state.notes[from] ? state.notes[from].filter((_, index) => index !== at).sort(sortNote) : [],
            };
          }

          // Add to destination
          if (to === "plans") {
            newState.plans = [noteToMove, ...newState.plans];
          } else if (to === "daily") {
            newState.daily = [noteToMove, ...newState.daily];
          } else {
            newState.notes = {
              ...newState.notes,
              [to]: [...(newState.notes[to] || []), noteToMove].sort(sortNote),
            };
          }

          return newState;
        }),

      upCount: (at) =>
        set((state) => {
          const newState = { ...state };
          return {
            ...newState,
            plans: [
              ...newState.plans.slice(0, at),
              { ...newState.plans[at], count: (newState.plans[at].count || 0) + 1 },
              ...newState.plans.slice(at + 1),
            ],
          };
        }),
    }),
    {
      name: "notes",
    }
  )
);

export default useStoreNotes;
