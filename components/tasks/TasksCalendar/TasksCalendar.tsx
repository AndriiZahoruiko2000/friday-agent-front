"use client";
import { useToDoStore } from "@/stores/todoStore";
import css from "./TasksCalendar.module.css";
import { useEffect, useState } from "react";
import { startOfWeek, endOfWeek, getDay } from "date-fns";

const TasksCalendar = () => {
  const setCurrentPage = useToDoStore((s) => s.setCurrentPage);
  const [dateArray, setDateArray] = useState<Date[]>([]);
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const now = new Date();

  const start = startOfWeek(now);

  const end = endOfWeek(now);

  useEffect(() => {
    setCurrentPage("tasks");
    const array = [];
    const copy = new Date(start);

    for (let i = 1; i <= 7; i++) {
      array.push(new Date(copy));
      copy.setDate(copy.getDate() + 1);
    }
    setDateArray(array);
  }, []);

  console.log(dateArray);

  return (
    <div className={css["tasksCalendar"]}>
      <ul>
        {dateArray.map((item, index) => {
          return (
            <li key={item.toISOString()}>
              {item.getDate()} {week[index]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TasksCalendar;
