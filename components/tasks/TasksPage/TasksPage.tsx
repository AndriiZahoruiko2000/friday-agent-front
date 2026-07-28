"use client";
import { useState } from "react";
import TaskCategoryList from "../TaskCategoryList/TaskCategoryList";
import TasksCalendar from "../TasksCalendar/TasksCalendar";
import TasksList from "../TasksList/TasksList";
import css from "./TasksPage.module.css";

const TasksPage = () => {
  const [pygeType, setPageType] = useState("Today");

  return (
    <div className={css["tasksPage"]}>
      <TasksCalendar />
      <TaskCategoryList />
      <TasksList />
    </div>
  );
};

export default TasksPage;
