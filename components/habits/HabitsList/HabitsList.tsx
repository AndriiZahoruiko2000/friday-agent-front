"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./HabitsList.module.css";
import { getHabits } from "@/services/habits";
import HabitItem from "./HabitItem/HabitItem";

const HabitsList = () => {
  const habitsQuery = useQuery({
    queryKey: ["habits"],
    queryFn: () => getHabits(),
  });

  const habitsList = habitsQuery.data || [];

  return (
    <div className={css["habitsList"]}>
      <ul>
        {habitsList.map((item) => {
          return <HabitItem key={item._id} habit={item} />;
        })}
      </ul>
    </div>
  );
};

export default HabitsList;
