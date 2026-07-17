import BudgetPreview from "../BudgetPreview/BudgetPreview";
import BudgetsList from "../BudgetsList/BudgetsList";
import CategoryWithdraw from "../CategoryWithdraw/CategoryWithdraw";
import css from "./BudgetStatistic.module.css";

const BudgetStatistic = () => {
  return (
    <div className={css["budgetStatistic"]}>
      <BudgetsList showNewCard={false} />
      <BudgetPreview />
      <CategoryWithdraw />
    </div>
  );
};

export default BudgetStatistic;
