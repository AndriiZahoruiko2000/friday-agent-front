"use client";
import css from "./CategoryWithdraw.module.css";
import { useMemo } from "react";
import CategoryImg from "@/components/custom/CategoryImg/CategoryImg";
import { useQuery } from "@tanstack/react-query";
import { useBudgetStore } from "@/stores/budgetStore";
import { getTransaction } from "@/services/transaction";

const CategoryWithdraw = () => {
  const budgetId = useBudgetStore((s) => s.currentBudgetId);

  const transactionsQuery = useQuery({
    queryKey: ["transactions", budgetId],
    queryFn: () => getTransaction({ budgetId }),
  });

  const entries = useMemo(() => {
    const transactions = transactionsQuery.data ?? [];
    const withdraw: Record<string, number> = {};

    for (const item of transactions) {
      if (item.transactionType === "withdraw") {
        withdraw[item.category] = (withdraw[item.category] || 0) + item.amount;
      }
    }

    return Object.entries(withdraw).toSorted((a, b) => b[1] - a[1]);
  }, [transactionsQuery.data]);

  return (
    <div className={css["categoryWithdraw"]}>
      <h2 className={css.title}>Spending by category</h2>
      {entries.length ? (
        <ul>
          {entries.map(([category, amount]) => {
            return (
              <li key={category}>
                <span className={css.categoryIcon} aria-hidden="true">
                  <CategoryImg category={category} />
                </span>
                <p className={css.categoryName}>{category}</p>
                <p className={css.amount}>{amount}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={css.emptyState}>No spending yet</p>
      )}
    </div>
  );
};

export default CategoryWithdraw;
