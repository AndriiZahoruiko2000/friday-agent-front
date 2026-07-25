import { create } from "zustand";

interface ToDoStore {
  currentPage: string;
  setCurrentPage: (newValue: string) => void;
}

export const useToDoStore = create<ToDoStore>()((setStore) => {
  return {
    currentPage: "",

    setCurrentPage: (newValue: string) => {
      setStore({ currentPage: newValue });
    },
  };
});
