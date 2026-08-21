"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./ShortStats.module.css";
import { getShifts } from "@/services/shiftsService";
import { LuSun } from "react-icons/lu";
import { RiMoonClearFill } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { IoWalletSharp } from "react-icons/io5";
import { FaEuroSign } from "react-icons/fa";
import { useShiftsStore } from "@/stores/shiftsStore";
import { getFirstDateOfMonth, getLastDateOfMonth } from "@/helpers/dates";

const ShortStats = () => {
  const currentDate = useShiftsStore((state) => state.date);
  const firstDay = getFirstDateOfMonth(currentDate);
  const lastDay = getLastDateOfMonth(currentDate);

  firstDay.setHours(0, 0, 0, 0);
  lastDay.setHours(23, 59, 59, 999);

  const startTime = firstDay.toISOString();
  const endTime = lastDay.toISOString();

  const shiftsQuery = useQuery({
    queryKey: ["shifts", { startTime, endTime }],
    queryFn: () => getShifts({ startTime, endTime }),
  });

  const shifts = shiftsQuery.data || [];

  const totalHours = shifts.reduce((acc, el) => {
    return acc + el.totalHours;
  }, 0);

  const nightHours = shifts.reduce((acc, el) => {
    return acc + el.nightHours;
  }, 0);

  const dayHours = totalHours - nightHours;

  const salary = (nightHours / 60) * 15 * 1.25 + (dayHours / 60) * 15;

  return (
    <ul className={css.stats}>
      <li className={css.card}>
        <FaRegClock />
        <p>Всього годин</p>
        <p>{totalHours / 60} год.</p>
      </li>
      <li className={css.card}>
        <LuSun />
        <p>Денних годин</p>
        <p>{dayHours / 60} год.</p>
      </li>
      <li className={css.card}>
        <RiMoonClearFill />
        <p>Нічних годин</p>
        <p>{nightHours / 60} год.</p>
      </li>
      <li className={css.card}>
        <IoWalletSharp />
        <p>Зароблено</p>
        <p>
          <FaEuroSign />
          {salary}
        </p>
      </li>
    </ul>
  );
};

export default ShortStats;
