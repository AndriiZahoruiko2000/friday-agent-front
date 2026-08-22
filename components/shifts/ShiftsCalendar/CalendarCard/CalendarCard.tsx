"use client";
import { Shift } from "@/types/shifts";
import css from "./CalendarCard.module.css";

interface CalendarCardProps {
  date: Date;
  shifts: Shift[];
  onSelect: (date: Date) => void;
}

const CalendarCard = ({ date, shifts, onSelect }: CalendarCardProps) => {
  const items = shifts.filter(
    (item) =>
      new Date(item.date).getDate() === date.getDate() &&
      new Date(item.date).getMonth() === date.getMonth(),
  );

  return (
    <li className={css.card}>
      <button type="button" onClick={() => onSelect(date)}>
        <span>{date.getDate()}</span>
        <div className={css["indicator-container"]}>
          {items.map((item) => {
            return <div className={css.indicator} key={item._id} />;
          })}
        </div>
      </button>
    </li>
  );
};

export default CalendarCard;
