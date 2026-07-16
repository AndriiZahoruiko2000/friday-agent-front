"use client";
import CurrencySelector from "@/components/custom/CurrencySelector/CurrencySelector";
import css from "./EditBudgetModal.module.css";
import { deleteBudget, updateBudget } from "@/services/budget";
import { useQueryClient } from "@tanstack/react-query";
import { useBudgetStore } from "@/stores/budgetStore";

interface EditBudgetModalProps {
  budgetId: string;
  closeModal: () => void;
}

const EditBudgetModal = ({ budgetId, closeModal }: EditBudgetModalProps) => {
  const queryClient = useQueryClient();
  const setCurrentBudgetId = useBudgetStore((s) => s.setCurrentBudgetId);

  const handleSubmit = async (formData: FormData) => {
    const budgetData = {
      balance: Number(formData.get("balance")),
      title: formData.get("title") as string,
      currency: formData.get("currency") as string,
    };

    await updateBudget(budgetId, budgetData);
    queryClient.invalidateQueries({
      queryKey: ["budgets"],
    });
    setCurrentBudgetId("");
    closeModal();
  };

  const handleDelete = async () => {
    await deleteBudget(budgetId);
    queryClient.invalidateQueries({ queryKey: ["budgets"] });
    closeModal();
  };

  return (
    <div className={css["edit-budget-modal"]}>
      <form action={handleSubmit}>
        <input type="number" name="balance" defaultValue={0} required />
        <input type="text" name="title" placeholder="title" required />
        <CurrencySelector />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleDelete} className={css["delete-btn"]}>
        Delete Budget
      </button>
    </div>
  );
};

export default EditBudgetModal;
