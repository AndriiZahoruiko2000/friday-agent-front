"use client";
import { useTransactionModal } from "@/hooks/useTransactionModal";
import css from "./CreateTransactionsModal.module.css";
import TransactionCategoryList from "../TransactionCategoryList/TransactionCategoryList";
import BudgetSelector from "@/components/custom/BudgetSelector/BudgetSelector";
import CalendarDateSelector from "@/components/custom/CalendarDateSelector/CalendarDateSelector";
import CurrencySelector from "@/components/custom/CurrencySelector/CurrencySelector";
import { createTransaction } from "@/services/transaction";
import { TransactionBody } from "@/types/transaction-types";
import { useQueryClient } from "@tanstack/react-query";

const CreateTransactionsModal = () => {
  const [, , hideModal] = useTransactionModal();
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: FormData) => {
    const transactionData: TransactionBody = {
      amount: Number(formData.get("amount")),
      budgetId: formData.get("budgetId") as string,
      transactionType: formData.get("transaction-type") as string,
      category: formData.get("category") as string,
      note: formData.get("note") as string,
      currency: formData.get("currency") as string,
    };

    await createTransaction(transactionData);

    queryClient.invalidateQueries({
      queryKey: ["transactions", transactionData.budgetId],
    });

    queryClient.invalidateQueries({
      queryKey: ["budgets"],
    });

    hideModal();
  };

  return (
    <form className={css.createTransactionsModal} action={handleSubmit}>
      <input
        className={css.amount}
        type="number"
        name="amount"
        defaultValue={0}
        min={1}
        aria-label="Transaction amount"
      />
      <TransactionCategoryList />
      <BudgetSelector />

      <div className={css.transactionType}>
        <label className={css.deposit}>
          Deposit
          <input type="radio" name="transaction-type" value={"deposit"} />
        </label>
        <label className={css.withdraw}>
          Withdraw
          <input
            type="radio"
            name="transaction-type"
            value={"withdraw"}
            defaultChecked
          />
        </label>
      </div>
      <div className={css.transactionType}>
        <CurrencySelector />
        <CalendarDateSelector />
      </div>

      <textarea className={css.note} name="note" placeholder="Note"></textarea>
      <button className={css.submit} type="submit">
        Add Transaction
      </button>
    </form>
  );
};

export default CreateTransactionsModal;
