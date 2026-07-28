"use client";

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
      <div className={css["heading"]}>
        <p className={css["eyebrow"]}>New routine</p>
        <h2 className={css["title"]}>Create a habit</h2>
        <p className={css["description"]}>
          Choose a name, an icon and a color for your new habit.
        </p>
      </div>

      <form className={css["form"]} action={handleSubmit}>
        <label className={css["field"]}>
          <span className={css["fieldLabel"]}>Habit name</span>
          <input
            className={css["textInput"]}
            type="text"
            name="title"
            placeholder="For example, drink water"
            autoComplete="off"
            maxLength={60}
            required
          />
        </label>

        <fieldset className={css["fieldGroup"]}>
          <legend className={css["fieldLabel"]}>Icon</legend>
          <HabitIconSelector />
        </fieldset>

        <fieldset className={css["fieldGroup"]}>
          <legend className={css["fieldLabel"]}>Color</legend>
          <label className={css["colorPicker"]}>
            <input
              className={css["colorInput"]}
              type="color"
              name="color"
              defaultValue="#0a84ff"
              aria-label="Habit color"
            />
            <span className={css["colorText"]}>
              <strong>Accent color</strong>
              <small>Used for the habit icon</small>
            </span>
            <span className={css["colorAction"]}>Change</span>
          </label>
        </fieldset>

        <button className={css["submitButton"]} type="submit">
          Create habit
        </button>
      </form>
    </div>
  );
};

export default CreateHabitForm;
