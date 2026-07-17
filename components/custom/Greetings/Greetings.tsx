"use client";
import { useUserStore } from "@/stores/userStore";
import css from "./Greetings.module.css";

const Greetings = () => {
  const user = useUserStore((s) => s.user);

  return <h2 className={css.greeting}>{user?.nickname}</h2>;
};

export default Greetings;
