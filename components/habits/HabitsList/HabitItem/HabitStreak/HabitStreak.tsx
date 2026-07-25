import { Habit } from "@/types/habits-types";
import css from "./HabitStreak.module.css";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/tasks";
import { startOfWeek, endOfWeek } from "date-fns";

const week = ["M", "T", "W", "T", "F", "S", "S"];

interface HabitStreakProps {
  habit: Habit;
}

const HabitStreak = ({ habit }: HabitStreakProps) => {
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

  console.log(weekTasks);

  return (
    <div className={css["habitStreak"]}>
      <ul className={css["weekList"]}>
        {week.map((item) => {
          return (
            <li className={css["day"]} key={item}>
              <p className={css["dayLabel"]}>{item}</p>
              <input
                className={css["dayCheckbox"]}
                type="checkbox"
                name="weekDay"
                value={item}
                aria-label={item}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HabitStreak;
