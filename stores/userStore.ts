import { getMe, refresh } from "@/services/auth";
import { User } from "@/types/auth-types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

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
        console.log("update user");

        await refresh();
        const user = await getMe();
        console.log(user);

        setStore({ user, isAuth: true });
      } catch (error) {
        console.log(error);

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
