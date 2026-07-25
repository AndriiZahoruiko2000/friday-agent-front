import { Habit } from "@/types/habits-types";
import css from "./HabitItem.module.css";
import HabitStreak from "./HabitStreak/HabitStreak";
import HabitButton from "./HabitButton/HabitButton";

interface HabitItemProps {
  habit: Habit;
}

const HabitItem = ({ habit }: HabitItemProps) => {
  return (
    <li className={css["habitItem"]}>
      <div className={css["habitInfo"]}>
        <div
          className={css["habitIcon"]}
          style={{ color: habit.color }}
          aria-hidden="true"
        >
          {habit.icon}
        </div>
        <div className={css["habitText"]}>
          <p className={css["habitTitle"]}>{habit.title}</p>
          <p className={css["habitStreakLabel"]}>
            {habit.currentStreak} day streak
          </p>
        </div>
      </div>
      <div className={css["week"]}>
        <HabitStreak habit={habit} />
      </div>
      <div className={css["today"]}>
        <HabitButton habit={habit} />
      </div>
    </li>
  );
};

export default HabitItem;
