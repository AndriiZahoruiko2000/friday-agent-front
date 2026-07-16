"use client";

import Modal from "@/components/custom/Modal/Modal";
import css from "./TransactionsList.module.css";

import CreateTransactionsModal from "../CreateTransactionsModal/CreateTransactionsModal";
import { useTransactionModal } from "@/hooks/useTransactionModal";
import { useBudgetStore } from "@/stores/budgetStore";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/services/transaction";
import TransactionCard from "./TransactionCard/TransactionCard";

const getDateKey = (dateValue: string) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "unknown";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDateLabel = (dateKey: string) => {
  if (dateKey === "unknown") return "Earlier";

  const date = new Date(`${dateKey}T00:00:00`);
  const today = new Date();
  const todayKey = getDateKey(today.toISOString());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday.toISOString());

  if (dateKey === todayKey) return "Today";
  if (dateKey === yesterdayKey) return "Yesterday";

  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
};

const TransactionsList = () => {
  const [isOpenTransactionModal, , hideModal] = useTransactionModal();
  const currentBudgetId = useBudgetStore((s) => s.currentBudgetId);

  const transactionsQuery = useQuery({
    queryKey: ["transactions", currentBudgetId],
    queryFn: () => getTransaction({ budgetId: currentBudgetId }),
  });

  const transactions = transactionsQuery.data || [];
  const groupedTransactions = Array.from(
    [...transactions]
      .sort(
        (first, second) =>
          new Date(second.createdAt).getTime() -
          new Date(first.createdAt).getTime(),
      )
      .reduce((groups, transaction) => {
        const dateKey = getDateKey(transaction.createdAt);
        const group = groups.get(dateKey) ?? [];
        group.push(transaction);
        groups.set(dateKey, group);
        return groups;
      }, new Map<string, typeof transactions>()),
  );

  return (
    <section className={css.transactionsList} aria-labelledby="transactions-title">
      <header className={css.header}>
        <div>
          <p>Activity</p>
          <h2 id="transactions-title">Transactions</h2>
        </div>
        <span>{transactions.length}</span>
      </header>

      {transactionsQuery.isPending && (
        <p className={css.state}>Loading transactions…</p>
      )}
      {transactionsQuery.isError && (
        <p className={`${css.state} ${css.error}`}>Could not load transactions</p>
      )}
      {!transactionsQuery.isPending && !transactionsQuery.isError && transactions.length === 0 && (
        <p className={css.state}>No transactions yet</p>
      )}

      <div className={css.groups}>
        {groupedTransactions.map(([dateKey, items]) => (
          <section className={css.group} key={dateKey}>
            <h3>{getDateLabel(dateKey)}</h3>
            <ul>
              {items.map((item) => (
                <TransactionCard key={item._id} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      {isOpenTransactionModal && (
        <Modal onClose={hideModal}>
          <CreateTransactionsModal />
        </Modal>
      )}
    </section>
  );
};

export default TransactionsList;
