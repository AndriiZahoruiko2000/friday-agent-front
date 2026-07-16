import BudgetNavigation from "../BudgetNavigation/BudgetNavigation";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={css.navigation} aria-label="Main navigation">
      <BudgetNavigation />
    </nav>
  );
};

export default Navigation;
