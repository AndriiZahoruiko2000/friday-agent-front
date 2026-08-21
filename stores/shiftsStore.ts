import { create } from "zustand";

interface ShiftsStore {
  date: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

export const useShiftsStore = create<ShiftsStore>()((setStore) => {
  return {
    date: new Date(),
    nextMonth: () => {
      setStore((s) => {
        const copy = new Date(s.date || Date.now());
        copy.setMonth(copy.getMonth() + 1);
        return { date: copy };
      });
    },

    prevMonth: () => {
      setStore((s) => {
        const copy = new Date(s.date || Date.now());
        copy.setMonth(copy.getMonth() - 1);
        return { date: copy };
      });
    },
  };
});
