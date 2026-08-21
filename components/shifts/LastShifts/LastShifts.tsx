"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./LastShifts.module.css";

import ShiftCard from "./ShiftCard/ShiftCard";
import { getShifts } from "@/services/shiftsService";

const LastShifts = () => {
  const shiftsListQuery = useQuery({
    queryKey: ["shifts"],
    queryFn: () => getShifts({}),
  });

  const shiftsList = shiftsListQuery.data || [];

  return (
    <section className={css.lastShifts}>
      <div className={css.header}>
        <h2>Останні зміни</h2>
        <span>Всі</span>
      </div>

      <ul className={css.list}>
        {shiftsList.map((item) => {
          return <ShiftCard key={item._id} shift={item} />;
        })}
      </ul>
    </section>
  );
};

export default LastShifts;
