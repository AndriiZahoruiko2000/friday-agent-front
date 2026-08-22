"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./ShiftsListByDate.module.css";
import { getShifts } from "@/services/shiftsService";
import ShiftsListCard from "./ShiftsListCard/ShiftsListCard";
import { useShifts } from "@/hooks/useShifts";

interface ShiftsListByDateProps {
  initialDate: Date | undefined;
}

const ShiftsListByDate = ({
  initialDate = new Date(),
}: ShiftsListByDateProps) => {
  const nextDay = new Date(initialDate);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(nextDay.getHours() - 1);

  const { shifts } = useShifts(initialDate, nextDay);

  return (
    <div className={css["shiftsListByDate"]}>
      <div className={css.header}>
        <span className={css.eyebrow}>Розклад</span>
        <h2>Зміни за день</h2>
      </div>
      <ul className={css.list}>
        {shifts.map((item) => {
          return <ShiftsListCard key={item._id} shift={item} />;
        })}
      </ul>
      {!shifts.length && (
        <div className={css.emptyState}>
          <span className={css.emptyIcon} aria-hidden="true" />
          <p>На цю дату змін немає</p>
          <span>Можна відпочити або додати нову зміну.</span>
        </div>
      )}
    </div>
  );
};

export default ShiftsListByDate;
