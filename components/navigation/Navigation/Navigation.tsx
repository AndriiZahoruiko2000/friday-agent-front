"use client";
import { useUserStore } from "@/stores/userStore";
import BudgetNavigation from "../BudgetNavigation/BudgetNavigation";
import css from "./Navigation.module.css";

const Navigation = () => {
  const isAuth = useUserStore((s) => s.isAuth);
  console.log(isAuth);

  return (
    <nav className={css.navigation} aria-label="Main navigation">
      {isAuth && <BudgetNavigation />}
    </nav>
  );
};

export default Navigation;
