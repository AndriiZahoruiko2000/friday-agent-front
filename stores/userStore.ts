import { User } from "@/types/auth-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  isAuth: boolean;
  setUser: (newUser: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()((setStore) => {
  return {
    user: null,
    isAuth: false,

    setUser: (newUser) => {
      setStore({ user: newUser, isAuth: true });
    },

    clearUser: () => {
      setStore({ user: null, isAuth: false });
    },
  };
});
