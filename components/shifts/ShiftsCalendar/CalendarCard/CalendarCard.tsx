"use client";
import { Shift } from "@/types/shifts";
import css from "./CalendarCard.module.css";

interface CalendarCardProps {
  date: Date;
  shifts: Shift[];
  onSelect: (date: Date) => void;
}

const CalendarCard = ({ date, shifts, onSelect }: CalendarCardProps) => {
  const hasShift = shifts.some(
    (item) => new Date(item.date).getDate() === date.getDate(),
  );

  return (
    <li className={css.card}>
      <button type="button" onClick={() => onSelect(date)}>
        <span>{date.getDate()}</span>
        {hasShift && <span className={css.indicator} />}
      </button>
    </li>
  );
};

export default CalendarCard;
