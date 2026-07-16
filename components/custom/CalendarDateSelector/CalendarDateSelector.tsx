"use client";

import css from "./CalendarDateSelector.module.css";
import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { IoCalendarClearOutline } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";

const CalendarButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ value, onClick }, ref) => {
  return (
    <button
      className={css.button}
      type="button"
      ref={ref}
      onClick={onClick}
    >
      <span className={css.icon} aria-hidden="true">
        <IoCalendarClearOutline />
      </span>
      <span className={css.text}>
        <strong>Calendar</strong>
        <small>{String(value ?? "Select date")}</small>
      </span>
    </button>
  );
});

CalendarButton.displayName = "CalendarButton";

const CalendarDateSelector = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={css.calendarDateSelector}>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => date && setStartDate(date)}
        customInput={<CalendarButton />}
        dateFormat="dd MMM yyyy"
        name="date"
        wrapperClassName={css.wrapper}
        popperClassName={css.popper}
        calendarClassName={css.calendar}
        showPopperArrow={false}
      />
    </div>
  );
};

export default CalendarDateSelector;
