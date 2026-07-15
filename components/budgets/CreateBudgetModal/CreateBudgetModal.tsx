"use client";
import { createBudget } from "@/services/budget";
import css from "./CreateBudgetModal.module.css";
import { useQueryClient } from "@tanstack/react-query";

const CreateBudgetModal = () => {
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: FormData) => {
    const budgetData = {
      balance: Number(formData.get("balance")),
      title: formData.get("title") as string,
      currency: formData.get("currency") as string,
    };

    await createBudget(budgetData);

    queryClient.invalidateQueries({
      queryKey: ["budgets"],
    });
  };

  return (
    <div className={css["createBudgetModal"]}>
      <form action={handleSubmit}>
        <input type="number" name="balance" defaultValue={0} required />
        <input type="text" name="title" placeholder="title" required />
        <select name="currency" required>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="EUR">EUR</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateBudgetModal;
