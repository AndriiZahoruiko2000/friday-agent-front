import { Habit } from "@/types/habits-types";
import css from "./HabitStreak.module.css";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getTasks } from "@/services/tasks";
import { startOfWeek, endOfWeek } from "date-fns";

const week = ["M", "T", "W", "T", "F", "S", "S"];

interface HabitStreakProps {
  habit: Habit;
}

const HabitStreak = ({ habit }: HabitStreakProps) => {
  const queryClient = useQueryClient();
  const today = new Date();

  const firstDay = startOfWeek(today, {
    weekStartsOn: 1, // 0 = Sunday, 1 = Monday
  });

  const lastDay = endOfWeek(today, {
    weekStartsOn: 1,
  });

  const tasksQuery = useQuery({
    queryKey: ["habitTasks", habit._id],
    queryFn: () =>
      getTasks({
        habitId: habit._id,
        startDate: firstDay.toISOString(),
        endDate: lastDay.toISOString(),
      }),
  });

  const weekTasks = tasksQuery.data || [];
  const weekDays = weekTasks.map((task) => {
    return new Date(task.dateTime!).getDay() - 1;
  });

  const handleDelete = async (index: number) => {
    const task = weekTasks.find(
      (item) => new Date(item.dateTime!).getDay() - 1 === index,
    );
    if (task) {
      await deleteTask(task._id);
    }

    queryClient.invalidateQueries({
      queryKey: ["habitTasks"],
    });

    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  };

  return (
    <div className={css["habitStreak"]}>
      <ul className={css["weekList"]}>
        {week.map((item, index) => {
          return (
            <li
              className={css["day"]}
              key={item}
              onClick={() => {
                handleDelete(index);
              }}
            >
              <p className={css["dayLabel"]}>{item}</p>
              <input
                className={css["dayCheckbox"]}
                type="checkbox"
                name="weekDay"
                value={item}
                aria-label={item}
                checked={weekDays.includes(index)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HabitStreak;
