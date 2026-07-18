"use client";
import { useCalendarStore } from "@/stores/calendarStore";
import css from "./DateSelector.module.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const DateSelector = () => {
  const date = useCalendarStore((s) => s.date);
  const prevMonth = useCalendarStore((s) => s.prevMonth);
  const nextMonth = useCalendarStore((s) => s.nextMonth);

  return (
    <div className={css.dateSelector}>
      <button type="button" onClick={prevMonth} aria-label="Попередній місяць">
        <IoChevronBack aria-hidden="true" />
      </button>
      <time dateTime={`${date.getFullYear()}-${date.getMonth() + 1}`}>
        {new Intl.DateTimeFormat("uk-UA", {
          month: "long",
          year: "numeric",
        }).format(date)}
      </time>
      <button type="button" onClick={nextMonth} aria-label="Наступний місяць">
        <IoChevronForward aria-hidden="true" />
      </button>
    </div>
  );
};

export default DateSelector;
