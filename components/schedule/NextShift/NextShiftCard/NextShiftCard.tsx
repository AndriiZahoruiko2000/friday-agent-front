"use client";
import { Schedule } from "@/types/schedule-types";
import css from "./NextShiftCard.module.css";
import { useQuery } from "@tanstack/react-query";
import { getShiftsById } from "@/services/schedule";
import { getIconByValue, timeToShift } from "@/helpers/utils";
import { IoChevronForward } from "react-icons/io5";

interface NextShiftCardProps {
  item: Schedule;
}

const NextShiftCard = ({ item }: NextShiftCardProps) => {
  const shiftQuery = useQuery({
    queryKey: ["shifts", item.scheduleShiftId],
    queryFn: () => getShiftsById(item.scheduleShiftId),
  });

  const shift = shiftQuery?.data;

  if (!shift) {
    return <></>;
  }

  const timeToNextShift = timeToShift(shift.startTime, item.date);

  return (
    <article className={css.card}>
      <div className={css.icon} aria-hidden="true">
        {getIconByValue(shift.icon)}
      </div>
      <div className={css.copy}>
        <strong>{shift.title}</strong>
        <span>
          {new Intl.DateTimeFormat("uk-UA", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }).format(new Date(item.date))}
          , {shift.startTime}–{shift.endTime}
        </span>
        <span className={css.countdown}>{timeToNextShift}</span>
      </div>
      <IoChevronForward className={css.chevron} aria-hidden="true" />
    </article>
  );
};

export default NextShiftCard;
