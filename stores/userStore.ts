import { getMe, refresh } from "@/services/auth";
import { User } from "@/types/auth-types";

import { create } from "zustand";

interface UserStore {
  user: User | null;
  isAuth: boolean;
  setUser: (newUser: User) => void;
  clearUser: () => void;
  updateUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>()((setStore) => {
  return {
    user: null,
    isAuth: false,
    updateUser: async () => {
      try {
        await refresh();
        const user = await getMe();

        setStore({ user, isAuth: true });
      } catch (error) {
        setStore({});
      }
    },

    setUser: (newUser) => {
      setStore({ user: newUser, isAuth: true });
    },

    clearUser: () => {
      setStore({ user: null, isAuth: false });
    },
  };
});
