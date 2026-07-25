import TasksCalendar from "@/components/tasks/TasksCalendar/TasksCalendar";
import css from "./Page.module.css";
import TasksList from "@/components/tasks/TasksList/TasksList";

const Page = () => {
  return (
    <div className={css["page"]}>
      <TasksCalendar />
      <TasksList />
    </div>
  );
};

export default Page;
