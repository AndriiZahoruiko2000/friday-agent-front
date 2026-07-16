"use client";
import { getMe, refresh } from "@/services/auth";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useUserStore((s) => s.setUser);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        await refresh();
        const user = await getMe();
        setUser(user);
      } catch (error) {
        // router.push("/auth/login");
      }
    }
    fetchUser();
  }, []);

  return children;
};

export default AuthProvider;
