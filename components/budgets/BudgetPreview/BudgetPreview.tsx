"use client";
import { useBudgetStore } from "@/stores/budgetStore";
import css from "./BudgetPreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBudgetById } from "@/services/budget";
import { getTransaction } from "@/services/transaction";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
  IoCardOutline,
  IoReceiptOutline,
} from "react-icons/io5";

const BudgetPreview = () => {
  const budgetId = useBudgetStore((s) => s.currentBudgetId);

  const budgetQuery = useQuery({
    queryKey: ["budget", budgetId],
    queryFn: () => getBudgetById(budgetId),
  });

  const budget = budgetQuery.data;

  const transactionsQuery = useQuery({
    queryKey: ["transactions", budgetId],
    queryFn: () => getTransaction({ budgetId }),
  });

  const transactions = transactionsQuery.data || [];

  const depositTransactions = transactions.filter(
    (item) => item.transactionType === "deposit",
  );

  const withdrawTransaction = transactions.filter(
    (item) => item.transactionType === "withdraw",
  );

  const totalDeposit = depositTransactions.reduce(
    (acc, el) => acc + el.amount,
    0,
  );

  const totalWithdraw = withdrawTransaction.reduce(
    (acc, el) => acc + el.amount,
    0,
  );

  return (
    <div className={css["budgetPreview"]}>
      <div className={css.deposit}>
        <span className={css.icon} aria-hidden="true">
          <IoArrowDownCircleOutline />
        </span>
        <div>
          <p>Deposit</p>
          <p>+{totalDeposit}</p>
        </div>
      </div>
      <div className={css.withdraw}>
        <span className={css.icon} aria-hidden="true">
          <IoArrowUpCircleOutline />
        </span>
        <div>
          <p>Withdraw</p>
          <p>-{totalWithdraw}</p>
        </div>
      </div>
      <div className={css.balance}>
        <span className={css.icon} aria-hidden="true">
          <IoCardOutline />
        </span>
        <div>
          <p>Balance</p>
          <p>{budget?.balance || 0}</p>
        </div>
      </div>
      <div className={css.transactions}>
        <span className={css.icon} aria-hidden="true">
          <IoReceiptOutline />
        </span>
        <div>
          <p>Transactions</p>
          <p>{transactions.length}</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetPreview;
