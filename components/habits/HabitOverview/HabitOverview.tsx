"use client";
import { useToDoStore } from "@/stores/todoStore";
import css from "./HabitOverview.module.css";
import { useEffect } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getHabits } from "@/services/habits";
import { getTasks } from "@/services/tasks";
import { startOfToday, endOfToday } from "date-fns";

const HabitOverview = () => {
  const serCurrentPage = useToDoStore((s) => s.setCurrentPage);
  const start = startOfToday();
  const end = endOfToday();

  useEffect(() => {
    serCurrentPage("habits");
  }, []);

  const habitsQuery = useQuery({
    queryKey: ["habitTasks"],
    queryFn: () => getHabits(),
  });

  const habits = habitsQuery.data || [];

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () =>
      getTasks({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      }),
  });

  const tasks = tasksQuery.data || [];

  const persantage = Math.round((tasks.length / habits.length) * 100);

  return (
    <div className={css["habitOverview"]}>
      <h2 className={css["title"]}>Today overview</h2>
      <div className={css["content"]}>
        <div
          className={css["progress"]}
          style={{
            background: `conic-gradient(from -90deg, #30d158 0 ${persantage}%, #2c2c2e ${persantage}% 100%)`,
          }}
        >
          <div className={css["progressValue"]}>
            <span>{persantage}%</span>
            <p>Done</p>
          </div>
        </div>

        <div className={css["stats"]}>
          <div className={css["statRow"]}>
            <div className={`${css["icon"]} ${css["completed"]}`}>
              <ImCheckboxChecked />
            </div>
            <p className={css["count"]}>{tasks.length}</p>
            <p className={css["label"]}>Completed</p>
          </div>
          <div className={css["statRow"]}>
            <div className={`${css["icon"]} ${css["inProgress"]}`}>
              <FaRegCircle />
            </div>
            <p className={css["count"]}>{habits.length - tasks.length}</p>
            <p className={css["label"]}>In Progress</p>
          </div>
          {/* <div className={css["statRow"]}>
            <div className={`${css["icon"]} ${css["skipped"]}`}>
              <FiMinusCircle />
            </div>
            <p className={css["count"]}>2</p>
            <p className={css["label"]}>Skipped</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HabitOverview;
