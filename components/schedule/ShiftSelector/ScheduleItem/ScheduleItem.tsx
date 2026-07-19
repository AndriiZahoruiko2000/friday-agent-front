"use client";
import { Schedule } from "@/types/schedule-types";
import css from "./ScheduleItem.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSchedule, getShiftsById } from "@/services/schedule";
import { getIconByValue } from "@/helpers/utils";
import { CSSProperties, PointerEvent, useRef, useState } from "react";

interface ScheduleItemProps {
  item: Schedule;
}

const ScheduleItem = ({ item }: ScheduleItemProps) => {
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startOffset: 0 });

  const queryClient = useQueryClient();

  const shiftsQuery = useQuery({
    queryKey: ["shifts", item.scheduleShiftId],
    queryFn: () => getShiftsById(item.scheduleShiftId),
  });

  const shift = shiftsQuery.data;

  if (!shift) {
    return null;
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { startX: event.clientX, startOffset: swipeX };
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const distance = event.clientX - dragRef.current.startX;
    const nextPosition = dragRef.current.startOffset + distance;
    setSwipeX(Math.max(-88, Math.min(0, nextPosition)));
  };

  const finishSwipe = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setSwipeX(swipeX < -42 ? -88 : 0);
  };

  const handleDelete = async () => {
    await deleteSchedule(item._id);

    queryClient.invalidateQueries({
      queryKey: [
        "schedule",
        {
          startDate: item.date,
          endDate: item.date,
        },
      ],
    });

    queryClient.invalidateQueries({
      queryKey: ["schedule"],
    });

    setSwipeX(0);
  };

  const itemStyle = {
    "--swipe-x": `${swipeX}px`,
    "--shift-color": shift.color || "#0a84ff",
  } as CSSProperties;

  return (
    <li className={css.scheduleItem} style={itemStyle}>
      <button
        className={css.deleteAction}
        type="button"
        aria-label={`Видалити зміну ${shift.title}`}
        onFocus={() => setSwipeX(-88)}
        onClick={handleDelete}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 8v9m4-9v9m4-9v9M5 5h14M9 5V3h6v2m3 0-1 15H7L6 5" />
        </svg>
        <span>Видалити</span>
      </button>

      <div
        className={`${css.itemContent} ${isDragging ? css.dragging : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishSwipe}
        onPointerCancel={finishSwipe}
        onDoubleClick={() => setSwipeX(0)}
      >
        <span className={css.pickerIcon} aria-hidden="true">
          {getIconByValue(shift.icon)}
        </span>
        <span className={css.pickerCopy}>
          <span className={css.status}>Заплановано</span>
          <strong>{shift.title}</strong>
          <span className={css.time}>
            {shift.startTime}–{shift.endTime}
          </span>
        </span>
        <span className={css.swipeIndicator} aria-hidden="true">
          ‹
        </span>
      </div>
    </li>
  );
};

export default ScheduleItem;
