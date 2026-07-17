"use client";
import { useUserStore } from "@/stores/userStore";
import css from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  const user = useUserStore((s) => s.user);

  return (
    <div className={css.profileInfo}>
      <h2>{user?.nickname || "Your name"}</h2>
      <p>{user?.email || "Email not specified"}</p>
      <span>Personal account</span>
    </div>
  );
};

export default ProfileInfo;
