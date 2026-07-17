import BudgetStatistic from "@/components/budgets/BudgetStatistic/BudgetStatistic";
import css from "./Page.module.css";

const Page = () => {
  return (
    <div className={css.page}>
      <BudgetStatistic />
    </div>
  );
};

export default Page;
