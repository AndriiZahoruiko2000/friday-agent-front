"use client";
import Link from "next/link";
import css from "./ToDoNavigation.module.css";
import { useModal } from "@/hooks/useModal";
import CreateHabitForm from "@/components/habits/CreateHabitForm/CreateHabitForm";
import Modal from "@/components/custom/Modal/Modal";
import { useToDoStore } from "@/stores/todoStore";
import CreateTasksForm from "@/components/tasks/CreateTasksForm/CreateTasksForm";
import { PiRadioButton } from "react-icons/pi";
import { FaTasks } from "react-icons/fa";

const ToDoNavigation = () => {
  const [isOpenModal, showModal, hideModal, toggle] = useModal();
  const currentPage = useToDoStore((s) => s.currentPage);

  return (
    <div className={css["toDoNavigation"]}>
      <Link href={"/tasks"}>
        <FaTasks />
      </Link>
      <button onClick={showModal}>+</button>
      <Link href={"/habits"}>
        <PiRadioButton />
      </Link>

      {isOpenModal && (
        <Modal onClose={hideModal}>
          {currentPage === "habits" && <CreateHabitForm />}
          {currentPage === "tasks" && <CreateTasksForm />}
        </Modal>
      )}
    </div>
  );
};

export default ToDoNavigation;
