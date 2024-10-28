import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStoreConfig = create(
  persist(
    (set) => ({
      ampm: false,
      view: "week",

      switchAmPm: () => set((state) => ({ ...state, ampm: !state.ampm })),
      setView: (payload) => set({ ...state, view: payload }),
    }),
    {
      name: "config",
    }
  )
);

export default useStoreConfig;
