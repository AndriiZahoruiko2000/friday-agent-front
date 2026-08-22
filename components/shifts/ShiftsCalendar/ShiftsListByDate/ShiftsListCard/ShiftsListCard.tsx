"use client";

import { Shift } from "@/types/shifts";
import css from "./ShiftsListCard.module.css";
import { PointerEvent, useRef, useState } from "react";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { deleteShifts } from "@/services/shiftsService";
import { useQueryClient } from "@tanstack/react-query";

interface ShiftsListCardProps {
  shift: Shift;
}

const ShiftsListCard = ({ shift }: ShiftsListCardProps) => {
  const ACTIONS_WIDTH = 144;
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ x: 0, offset: 0, time: 0, moved: false });
  const queryClient = useQueryClient();

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      x: event.clientX,
      offset,
      time: performance.now(),
      moved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const distance = event.clientX - dragRef.current.x;
    if (Math.abs(distance) > 5) dragRef.current.moved = true;

    setOffset(
      Math.max(-ACTIONS_WIDTH, Math.min(0, dragRef.current.offset + distance)),
    );
  };

  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const distance = event.clientX - dragRef.current.x;
    const duration = Math.max(performance.now() - dragRef.current.time, 1);
    const velocity = distance / duration;
    const finalOffset = Math.max(
      -ACTIONS_WIDTH,
      Math.min(0, dragRef.current.offset + distance),
    );
    const shouldOpen = finalOffset < -ACTIONS_WIDTH / 2 || velocity < -0.5;
    const shouldClose = finalOffset > -ACTIONS_WIDTH / 2 || velocity > 0.5;

    setIsDragging(false);
    setOffset(shouldOpen && !shouldClose ? -ACTIONS_WIDTH : 0);
  };

  const handleEdit = async () => {};

  const handleDelete = async () => {
    await deleteShifts(shift._id);
    queryClient.invalidateQueries({ queryKey: ["shifts"] });

    setOffset(0);
  };

  return (
    <li className={css.swipeItem}>
      <div
        className={`${css.actions} ${offset !== 0 ? css.actionsVisible : ""}`}
        aria-hidden={offset === 0}
      >
        <button
          className={css.editAction}
          type="button"
          aria-label="Редагувати зміну"
          tabIndex={offset === 0 ? -1 : 0}
          onClick={handleEdit}
        >
          <IoPencilOutline aria-hidden="true" />
          <span>Редагувати</span>
        </button>
        <button
          className={css.deleteAction}
          type="button"
          aria-label="Видалити зміну"
          tabIndex={offset === 0 ? -1 : 0}
          onClick={handleDelete}
        >
          <IoTrashOutline aria-hidden="true" />
          <span>Видалити</span>
        </button>
      </div>

      <div
        className={`${css.card} ${isDragging ? css.dragging : ""}`}
        style={{ transform: `translate3d(${offset}px, 0, 0)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishSwipe}
        onPointerCancel={finishSwipe}
        onClick={() => {
          if (!dragRef.current.moved && offset !== 0) setOffset(0);
        }}
      >
        <span className={css.icon} aria-hidden="true" />
        <div className={css.content}>
          <span className={css.label}>Робоча зміна</span>
          <p>
            <time>{shift.startTime}</time>
            <span className={css.separator} aria-hidden="true">
              –
            </span>
            <time>{shift.endTime}</time>
          </p>
        </div>
        <span className={css.chevron} aria-hidden="true">
          ›
        </span>
      </div>
    </li>
  );
};

export default ShiftsListCard;
