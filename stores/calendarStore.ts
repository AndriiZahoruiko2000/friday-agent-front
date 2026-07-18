import { create } from "zustand";

interface CalendarStore {
  date: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

export const useCalendarStore = create<CalendarStore>()((setStore) => {
  return {
    date: new Date(),
    prevMonth: () => {
      setStore((store) => {
        const copyDate = new Date(store.date);
        copyDate.setMonth(copyDate.getMonth() - 1);

        return { date: copyDate };
      });
    },
    nextMonth: () => {
      setStore((store) => {
        const copyDate = new Date(store.date);
        copyDate.setMonth(copyDate.getMonth() + 1);
        return { date: copyDate };
      });
    },
  };
});
