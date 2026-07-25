"use client";
import { Habit } from "@/types/habits-types";
import css from "./HabitButton.module.css";
import { FaRegCircle } from "react-icons/fa";
import { createTask } from "@/services/tasks";
import { useQueryClient } from "@tanstack/react-query";

interface HabitButtonProps {
  habit: Habit;
}

const HabitButton = ({ habit }: HabitButtonProps) => {
  const queryClient = useQueryClient();
  const handleClick = async () => {
    const body = {
      title: habit.title,
      isCompleted: true,
      isDaily: true,
      habitId: habit._id,
    };

    await createTask(body);
    queryClient.invalidateQueries({
      queryKey: ["habitTasks", habit._id],
    });
  };

  return (
    <div className={css["habitButton"]}>
      <button
        type="button"
        aria-label="Mark habit as completed"
        onClick={handleClick}
      >
        <FaRegCircle />
      </button>
    </div>
  );
};

export default HabitButton;
