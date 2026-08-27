"use client";

import css from "./ShortStats.module.css";

import { LuSun } from "react-icons/lu";
import { RiMoonClearFill } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { IoWalletSharp } from "react-icons/io5";
import { FaEuroSign } from "react-icons/fa";
import { useShiftsStore } from "@/stores/shiftsStore";
import { getFirstDateOfMonth, getLastDateOfMonth } from "@/helpers/dates";
import { useShifts } from "@/hooks/useShifts";

const ShortStats = () => {
  const currentDate = useShiftsStore((state) => state.date);
  const firstDay = getFirstDateOfMonth(currentDate);
  const lastDay = getLastDateOfMonth(currentDate);

  firstDay.setHours(0, 0, 0, 0);
  lastDay.setHours(23, 59, 59, 999);

  const { totalHours, dayHours, salary, nightHours } = useShifts(
    firstDay,
    lastDay,
  );

  return (
    <ul className={css.stats}>
      <li className={css.card}>
        <FaRegClock />
        <p>Всього годин</p>
        <p>{(totalHours / 60).toFixed(2)} год.</p>
      </li>
      <li className={css.card}>
        <LuSun />
        <p>Денних годин</p>
        <p>{(dayHours / 60).toFixed(2)} год.</p>
      </li>
      <li className={css.card}>
        <RiMoonClearFill />
        <p>Нічних годин</p>
        <p>{(nightHours / 60).toFixed(2)} год.</p>
      </li>
      <li className={css.card}>
        <IoWalletSharp />
        <p>Зароблено</p>
        <p>
          <FaEuroSign />
          {String(salary).slice(0, 7)}
        </p>
      </li>
    </ul>
  );
};

export default ShortStats;
