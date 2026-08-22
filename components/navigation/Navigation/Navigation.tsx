"use client";
import { useUserStore } from "@/stores/userStore";
import BudgetNavigation from "../BudgetNavigation/BudgetNavigation";
import css from "./Navigation.module.css";
import CommonNavigation from "../CommonNavigation/CommonNavigation";
import { usePathname } from "next/navigation";
import ToDoNavigation from "../ToDoNavigation/ToDoNavigation";
import ShiftsNavigation from "../ShiftsNavigation/ShiftsNavigation";

const Navigation = () => {
  const isAuth = useUserStore((s) => s.isAuth);
  const location = usePathname();
  const url = location;
  const isBudgetUrl = url.startsWith("/budgets");
  const isHabitsUrl = url.startsWith("/habits");
  const isTasksUrl = url.startsWith("/tasks");
  const isShiftsUrl = url.startsWith("/shifts");
  const isToDoUrl = isHabitsUrl || isTasksUrl;
  const isMainPage = url === "/";

  return (
    <nav className={css.navigation} aria-label="Main navigation">
      {isAuth && !isMainPage && <CommonNavigation />}
      {isAuth && isBudgetUrl && <BudgetNavigation />}
      {isAuth && isToDoUrl && <ToDoNavigation />}
      {isAuth && isShiftsUrl && <ShiftsNavigation />}
    </nav>
  );
};

export default Navigation;
