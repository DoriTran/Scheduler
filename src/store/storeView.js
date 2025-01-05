import moment from "moment";
import { getMomentAsObject } from "utils";
import { create } from "zustand";

const useStoreView = create((set) => ({
  viewValue: getMomentAsObject(moment()),
  setViewValue: (newViewValue) => set({ viewValue: newViewValue }),
}));

export default useStoreView;
