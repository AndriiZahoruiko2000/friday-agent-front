"use client";
import CurrencySelector from "@/components/custom/CurrencySelector/CurrencySelector";
import css from "./EditBudgetModal.module.css";
import { deleteBudget, updateBudget } from "@/services/budget";
import { useQueryClient } from "@tanstack/react-query";

interface EditBudgetModalProps {
  budgetId: string;
  closeModal: () => void;
}

const EditBudgetModal = ({ budgetId, closeModal }: EditBudgetModalProps) => {
  const queryClient = useQueryClient();

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

    closeModal();
  };

  const handleDelete = async () => {
    await deleteBudget(budgetId);
    queryClient.invalidateQueries({ queryKey: ["budgets"] });
    closeModal();
  };

  return (
    <div>
      <form action={handleSubmit}>
        <input type="number" name="balance" defaultValue={0} required />
        <input type="text" name="title" placeholder="title" required />
        <CurrencySelector />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleDelete}>Delete Budget</button>
    </div>
  );
};

export default EditBudgetModal;
