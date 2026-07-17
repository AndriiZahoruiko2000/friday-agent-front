"use client";

import css from "./SignOutButton.module.css";
import { MdLogout } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";
import { useUserStore } from "@/stores/userStore";

const SignOutButton = () => {
  const router = useRouter();
  const clearUser = useUserStore((s) => s.clearUser);

  const handleLogout = async () => {
    await logout();
    clearUser();
    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={css.navigationCard}
      style={{ "--delay": `${5 * 55}ms` } as React.CSSProperties}
    >
      <span className={css.cardIcon} aria-hidden="true">
        <MdLogout />
      </span>
      <div>
        <strong>Sign out</strong>
        <p>End this session</p>
      </div>
      <FiChevronRight className={css.chevron} aria-hidden="true" />
    </button>
  );
};

export default SignOutButton;
