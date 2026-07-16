import { create } from "zustand";

interface BudgetStore {
  value: number;
  setValue: (newValue: number) => void;
  increment: () => void;
  clearValue: () => void;
  isOpenTransactionModal: boolean;
  setIsOpenTransactionModal: (newValue: boolean) => void;
  currentBudgetId: string;
  setCurrentBudgetId: (newValue: string) => void;
}

export const useBudgetStore = create<BudgetStore>()((setStore) => {
  return {
    value: 0,
    isOpenTransactionModal: false,
    currentBudgetId: "",

    setIsOpenTransactionModal: (newValue) => {
      setStore({ isOpenTransactionModal: newValue });
    },

    setCurrentBudgetId: (newValue) => {
      setStore({ currentBudgetId: newValue });
    },

    setValue: (newValue) => {
      setStore({ value: newValue });
    },

    increment: () => {
      setStore((s) => {
        return { value: s.value + 1 };
      });
    },

    clearValue: () => {
      setStore({ value: 0 });
    },
  };
});
