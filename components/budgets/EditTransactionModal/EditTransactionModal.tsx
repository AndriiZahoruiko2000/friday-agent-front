"use client";
import TransactionCategoryList from "../TransactionCategoryList/TransactionCategoryList";
import css from "./EditTransactionModal.module.css";
import { useState } from "react";
import CurrencySelector from "@/components/custom/CurrencySelector/CurrencySelector";
import CalendarDateSelector from "@/components/custom/CalendarDateSelector/CalendarDateSelector";
import { UpdateTransactionBody } from "@/types/transaction-types";
import { useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "@/services/transaction";
import { useBudgetStore } from "@/stores/budgetStore";

interface EditTransactionModalProps {
  transactionId: string;
  closeModal: () => void;
}

const EditTransactionModal = ({
  transactionId,
  closeModal,
}: EditTransactionModalProps) => {
  const queryClient = useQueryClient();
  const [isDeposit, setIsDeposit] = useState(false);
  const currentBudgetId = useBudgetStore((s) => s.currentBudgetId);

  const handleSubmit = async (formData: FormData) => {
    const transactionData: UpdateTransactionBody = {
      amount: Number(formData.get("amount")),
      transactionType: formData.get("transaction-type") as string,
      category: formData.get("category") as string,
      note: formData.get("note") as string,
      currency: formData.get("currency") as string,
    };

    await updateTransaction(transactionId, transactionData);

    queryClient.invalidateQueries({
      queryKey: ["transactions", currentBudgetId],
    });

    queryClient.invalidateQueries({
      queryKey: ["budgets"],
    });

    closeModal();
  };

  return (
    <form className={css["editTransactionModal"]} action={handleSubmit}>
      <input
        className={css.amount}
        type="number"
        name="amount"
        defaultValue={0}
        min={0.01}
        aria-label="Transaction amount"
        step={0.01}
      />
      <TransactionCategoryList isDeposit={isDeposit} />

      <div className={css.transactionType}>
        <label className={css.deposit}>
          Deposit
          <input
            type="radio"
            name="transaction-type"
            value={"deposit"}
            onChange={() => {
              setIsDeposit(true);
            }}
            checked={isDeposit}
          />
        </label>
        <label className={css.withdraw}>
          Withdraw
          <input
            type="radio"
            name="transaction-type"
            value={"withdraw"}
            onChange={() => {
              setIsDeposit(false);
            }}
            checked={!isDeposit}
          />
        </label>
      </div>
      <div className={css.transactionType}>
        <CurrencySelector />
        <CalendarDateSelector />
      </div>

      <textarea className={css.note} name="note" placeholder="Note"></textarea>
      <button className={css.submit} type="submit">
        Save
      </button>
    </form>
  );
};

export default EditTransactionModal;
