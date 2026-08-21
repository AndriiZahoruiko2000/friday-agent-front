"use client";

import { useShiftsStore } from "@/stores/shiftsStore";
import css from "./MonthSelector.module.css";

const MonthSelector = () => {
  const nextMonth = useShiftsStore((s) => s.nextMonth);
  const prevMonth = useShiftsStore((s) => s.prevMonth);
  const currentDate = useShiftsStore((s) => s.date);

  const currentMonth = currentDate.toLocaleDateString("uk-UA", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={css["monthSelector"]}>
      <button type="button" onClick={prevMonth} aria-label="Попередній місяць" />
      <p className={css.currentMonth}>{currentMonth}</p>
      <button type="button" onClick={nextMonth} aria-label="Наступний місяць" />
    </div>
  );
};

export default MonthSelector;
