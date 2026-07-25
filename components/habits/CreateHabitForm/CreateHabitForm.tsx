import { createHabits } from "@/services/habits";
import HabitIconSelector from "../HabitIconSelector/HabitIconSelector";
import css from "./CreateHabitForm.module.css";
import { useQueryClient } from "@tanstack/react-query";

const CreateHabitForm = () => {
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: FormData) => {
    const habitData = {
      title: formData.get("title") as string,
      icon: formData.get("iconName") as string,
      color: formData.get("color") as string,
    };
    await createHabits(habitData);

    queryClient.invalidateQueries({
      queryKey: ["habits"],
    });
  };

  return (
    <div className={css["createHabitForm"]}>
      <form action={handleSubmit}>
        <input type="text" name="title" placeholder="title" />
        <HabitIconSelector />
        <input type="color" name="color" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateHabitForm;
