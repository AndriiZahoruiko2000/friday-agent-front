"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./NextShift.module.css";
import { getSchedule } from "@/services/schedule";
import NextShiftCard from "./NextShiftCard/NextShiftCard";

const NextShift = () => {
  const scheduleQuery = useQuery({
    queryKey: ["schedule"],
    queryFn: () => getSchedule({ startDate: new Date().toISOString() }),
  });

  const schedule = scheduleQuery.data || [];
  const nextItem = [...schedule]
    .filter((item) => new Date(item.date) >= new Date())
    .sort(
      (first, second) =>
        new Date(first.date).getTime() - new Date(second.date).getTime(),
    )[0];

  if (!nextItem) return null;

  return (
    <section className={css.nextShift} aria-labelledby="next-shift-title">
      <h2 id="next-shift-title">Наступна зміна</h2>
      <NextShiftCard item={nextItem} />
    </section>
  );
};

export default NextShift;
