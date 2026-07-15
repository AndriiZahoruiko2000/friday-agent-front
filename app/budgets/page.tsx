import BudgetsList from "@/components/budgets/BudgetsList/BudgetsList";
import css from "./Page.module.css";
import TransactionsList from "@/components/budgets/TransactionsList/TransactionsList";
import SubscriptionList from "@/components/budgets/SubscriptionList/SubscriptionList";
import SubscriptionCalendar from "@/components/budgets/SubscriptionCalendar/SubscriptionCalendar";

const Page = () => {
  return (
    <div className={css["page"]}>
      <BudgetsList />
      <TransactionsList />
      <SubscriptionList />
      <SubscriptionCalendar />
    </div>
  );
};

export default Page;
