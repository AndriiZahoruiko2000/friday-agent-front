"use client";
import { useToDoStore } from "@/stores/todoStore";
import css from "./TasksCalendar.module.css";
import { useEffect } from "react";

const TasksCalendar = () => {
  const setCurrentPage = useToDoStore((s) => s.setCurrentPage);

  useEffect(() => {
    setCurrentPage("tasks");
  }, []);

  return <div className={css["tasksCalendar"]}>TasksCalendar</div>;
};

export default TasksCalendar;
