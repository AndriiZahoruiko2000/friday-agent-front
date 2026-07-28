"use client";

import { Habit } from "@/types/habits-types";
import css from "./HabitItem.module.css";
import HabitStreak from "./HabitStreak/HabitStreak";
import HabitButton from "./HabitButton/HabitButton";
import { CSSProperties, PointerEvent, useRef, useState } from "react";

interface HabitItemProps {
  habit: Habit;
}

const deleteHabit = async (habitId: string) => {
  // TODO: Add the habit deletion request here.
  void habitId;
};

const HabitItem = ({ habit }: HabitItemProps) => {
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startOffset: 0 });

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest("button, input, label")) return;

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
    await deleteHabit(habit._id);
    setSwipeX(0);
  };

  const itemStyle = {
    "--swipe-x": `${swipeX}px`,
  } as CSSProperties;

  return (
    <li className={css["swipeItem"]} style={itemStyle}>
      <button
        className={css["deleteAction"]}
        type="button"
        aria-label={`Delete ${habit.title}`}
        onFocus={() => setSwipeX(-88)}
        onClick={handleDelete}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 8v9m4-9v9m4-9v9M5 5h14M9 5V3h6v2m3 0-1 15H7L6 5" />
        </svg>
        <span>Delete</span>
      </button>

      <div
        className={`${css["habitItem"]} ${isDragging ? css["dragging"] : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishSwipe}
        onPointerCancel={finishSwipe}
        onDoubleClick={() => setSwipeX(0)}
      >
        <div className={css["habitInfo"]}>
          <div
            className={css["habitIcon"]}
            style={{ color: habit.color }}
            aria-hidden="true"
          >
            {habit.icon}
          </div>
          <div className={css["habitText"]}>
            <p className={css["habitTitle"]}>{habit.title}</p>
            <p className={css["habitStreakLabel"]}>
              {habit.currentStreak} day streak
            </p>
          </div>
        </div>
        <div className={css["week"]}>
          <HabitStreak habit={habit} />
        </div>
        <div className={css["today"]}>
          <HabitButton habit={habit} />
        </div>
      </div>
    </li>
  );
};

export default HabitItem;
