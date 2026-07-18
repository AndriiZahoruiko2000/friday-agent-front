"use client";
import { useMemo } from "react";
import css from "./CalendarBody.module.css";
import CalendarCard from "./CalendarCard/CalendarCard";
import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "@/services/schedule";
import { useCalendarStore } from "@/stores/calendarStore";

const CalendarBody = () => {
  const selectedDate = useCalendarStore((state) => state.date);
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const dates = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const mondayOffset = (firstDay.getDay() + 6) % 7;
    const gridStart = new Date(year, month, 1 - mondayOffset);
    const gridEndOffset = 6 - ((lastDay.getDay() + 6) % 7);
    const gridEnd = new Date(year, month + 1, gridEndOffset);
    const result: Date[] = [];

    for (
      const cursor = new Date(gridStart);
      cursor <= gridEnd;
      cursor.setDate(cursor.getDate() + 1)
    ) {
      result.push(new Date(cursor));
    }

    return result;
  }, [month, year]);

  const scheduleQuery = useQuery({
    queryKey: ["schedule", year, month],
    queryFn: () =>
      getSchedule({
        startDate: dates[0]?.toISOString(),
        endDate: dates.at(-1)?.toISOString(),
      }),
  });

  const schedule = scheduleQuery.data || [];

  return (
    <div className={css.calendarBody}>
      <ul className={css["calendar"]}>
        {dates.map((item) => {
          return (
            <CalendarCard
              date={item}
              key={item.toISOString()}
              schedule={schedule}
              isOutsideMonth={item.getMonth() !== month}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CalendarBody;
