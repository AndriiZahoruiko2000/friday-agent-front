"use client";
import { useToDoStore } from "@/stores/todoStore";
import css from "./HabitOverview.module.css";
import { useEffect } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { FaRegCircle } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";

const HabitOverview = () => {
  const serCurrentPage = useToDoStore((s) => s.setCurrentPage);

  useEffect(() => {
    serCurrentPage("habits");
  }, []);

  return (
    <div className={css["habitOverview"]}>
      <h2 className={css["title"]}>Today overview</h2>
      <div className={css["content"]}>
        <div className={css["progress"]}>
          <div className={css["progressValue"]}>
            <span>75%</span>
            <p>Done</p>
          </div>
        </div>

        <div className={css["stats"]}>
          <div className={css["statRow"]}>
            <div className={`${css["icon"]} ${css["completed"]}`}>
              <ImCheckboxChecked />
            </div>
            <p className={css["count"]}>6</p>
            <p className={css["label"]}>Completed</p>
          </div>
          <div className={css["statRow"]}>
            <div className={`${css["icon"]} ${css["inProgress"]}`}>
              <FaRegCircle />
            </div>
            <p className={css["count"]}>2</p>
            <p className={css["label"]}>In Progress</p>
          </div>
          <div className={css["statRow"]}>
            <div className={`${css["icon"]} ${css["skipped"]}`}>
              <FiMinusCircle />
            </div>
            <p className={css["count"]}>2</p>
            <p className={css["label"]}>Skipped</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitOverview;
