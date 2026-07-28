"use client";
import css from "./HabitFooter.module.css";
import { GrTrophy } from "react-icons/gr";
import { BsFire } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getHabits } from "@/services/habits";

const HabitFooter = () => {
  const habitsQuery = useQuery({
    queryKey: ["habitTasks"],
    queryFn: () => getHabits(),
  });

  const habits = habitsQuery.data || [];
  const streakArray = habits.map((item) => item.bestSteak);
  const bestStreak = Math.max(...streakArray);

  return (
    <div className={css["habitFooter"]}>
      <div className={css["stat"]}>
        <div className={`${css["icon"]} ${css["trophy"]}`} aria-hidden="true">
          <GrTrophy />
        </div>
        <div className={css["text"]}>
          <p className={css["label"]}>Best Streak</p>
          <span className={css["value"]}>{bestStreak}</span>
        </div>
      </div>
      <div className={css["stat"]}>
        <div className={`${css["icon"]} ${css["fire"]}`} aria-hidden="true">
          <BsFire />
        </div>
        <div className={css["text"]}>
          <p className={css["label"]}>Total Habits</p>
          <span className={css["value"]}>{habits.length}</span>
        </div>
      </div>
    </div>
  );
};

export default HabitFooter;
