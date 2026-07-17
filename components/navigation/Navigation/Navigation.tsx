"use client";
import { useUserStore } from "@/stores/userStore";
import BudgetNavigation from "../BudgetNavigation/BudgetNavigation";
import css from "./Navigation.module.css";
import CommonNavigation from "../CommonNavigation/CommonNavigation";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const isAuth = useUserStore((s) => s.isAuth);
  const location = usePathname();
  const url = location;
  const isBudgetUrl = url.startsWith("/budgets");
  const isMainPage = url === "/";

  return (
    <nav className={css.navigation} aria-label="Main navigation">
      {isAuth && !isMainPage && <CommonNavigation />}
      {isAuth && isBudgetUrl && <BudgetNavigation />}
    </nav>
  );
};

export default Navigation;
