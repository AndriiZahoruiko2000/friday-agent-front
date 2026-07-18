import ShiftSelector from "@/components/schedule/ShiftSelector/ShiftSelector";
import css from "./CalendarCard.module.css";

import { useModal } from "@/hooks/useModal";
import { Schedule } from "@/types/schedule-types";
import { checkDate, getIconByValue } from "@/helpers/utils";
import { useQuery } from "@tanstack/react-query";
import { getShiftsById } from "@/services/schedule";
import Modal from "@/components/custom/Modal/Modal";
import { CSSProperties } from "react";

interface CalendarCardProps {
  date: Date;
  schedule: Schedule[];
  isOutsideMonth: boolean;
}

const CalendarCard = ({
  date,
  schedule,
  isOutsideMonth,
}: CalendarCardProps) => {
  const [isOpenShiftModal, showModal, hideModal] = useModal();

  const scheduleItem = schedule.find((item) => checkDate(item.date, date));

  const shiftsQuery = useQuery({
    queryKey: ["shift", scheduleItem?.scheduleShiftId],
    queryFn: () => getShiftsById(scheduleItem?.scheduleShiftId || ""),
    enabled: Boolean(scheduleItem?.scheduleShiftId),
  });

  const shift = shiftsQuery.data;

  const isToday = checkDate(date, new Date());
  const label = new Intl.DateTimeFormat("uk-UA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
  const shiftStyle = shift
    ? ({
        "--shift-color": shift.color || "#0a84ff",
      } as CSSProperties)
    : undefined;

  return (
    <li
      className={`${css["calendar-item"]} ${isOutsideMonth ? css.outside : ""}`}
    >
      <button
        className={css.dayButton}
        type="button"
        onClick={showModal}
        aria-label={`${label}${shift ? `, ${shift.title}` : ", зміни немає"}`}
      >
        <span className={`${css.dayNumber} ${isToday ? css.today : ""}`}>
          {date.getDate()}
        </span>
        {shift && (
          <span className={css.shift} style={shiftStyle}>
            <span className={css.shiftIcon} aria-hidden="true">
              {getIconByValue(shift.icon)}
            </span>
            <span className={css.shiftTime}>
              {shift.startTime.slice(0, 2)}–{shift.endTime.slice(0, 2)}
            </span>
          </span>
        )}
      </button>
      {isOpenShiftModal && (
        <Modal onClose={hideModal}>
          <ShiftSelector date={date} onClose={hideModal} />
        </Modal>
      )}
    </li>
  );
};

export default CalendarCard;
