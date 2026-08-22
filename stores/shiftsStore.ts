import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShiftsStore {
  date: Date;
  prevMonth: () => void;
  nextMonth: () => void;

  totalHours: number;
  setTotalHours: (newValue: number) => void;

  nightHours: number;
  setNightHours: (newValue: number) => void;

  pricePerHour: number;
  setPricePerHour: (newValue: number) => void;
}

export const useShiftsStore = create<ShiftsStore>()(
  persist(
    (setStore) => {
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

        totalHours: 160,

        setTotalHours: (newValue) => {
          setStore((s) => {
            return {
              totalHours: newValue,
            };
          });
        },

        nightHours: 0,

        setNightHours: (newValue) => {
          setStore((s) => {
            return {
              nightHours: newValue,
            };
          });
        },

        pricePerHour: 0,
        setPricePerHour: (newValue) => {
          setStore((s) => {
            return {
              pricePerHour: newValue,
            };
          });
        },
      };
    },
    {
      name: "shifts",
      partialize: (state) => {
        return {
          totalHours: state.totalHours,
          nightHours: state.nightHours,
          pricePerHour: state.pricePerHour,
        };
      },
    },
  ),
);
