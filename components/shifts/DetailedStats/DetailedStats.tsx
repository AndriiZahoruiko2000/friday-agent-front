"use client";
import { CSSProperties, useState } from "react";
import css from "./DetailedStats.module.css";

import { useShifts } from "@/hooks/useShifts";
import { getFirstDateOfMonth, getLastDateOfMonth } from "@/helpers/dates";
import { useShiftsStore } from "@/stores/shiftsStore";

const DetailedStats = () => {
  const [date, setDate] = useState(new Date());
  const firstDay = getFirstDateOfMonth(date);
  const lastDay = getLastDateOfMonth(date);
  const targetTotalHours = useShiftsStore((s) => s.totalHours);

  const handleNextMonth = () => {
    const copy = new Date(date);
    copy.setMonth(copy.getMonth() + 1);
    setDate(copy);
  };
  const handlePrevMonth = () => {
    const copy = new Date(date);
    copy.setMonth(copy.getMonth() - 1);
    setDate(copy);
  };

  const currentMonth = date.toLocaleDateString("uk-UA", {
    month: "long",
    year: "numeric",
  });

  const { shifts, totalHours, dayHours, salary, nightHours } = useShifts(
    firstDay,
    lastDay,
  );

  const progress = Math.round((totalHours / 60 / targetTotalHours) * 100);

  return (
    <section className={css.detailedStats}>
      <header className={css.header}>
        <div>
          <span>Аналітика</span>
          <h1>Статистика змін</h1>
        </div>
        <span className={css.status}>За місяць</span>
      </header>

      <div className={css.periodSelector}>
        <button
          type="button"
          aria-label="Попередній місяць"
          onClick={handlePrevMonth}
        >
          ‹
        </button>
        <p>{currentMonth}</p>
        <button
          type="button"
          aria-label="Наступний місяць"
          onClick={handleNextMonth}
        >
          ›
        </button>
      </div>

      <div className={css.progressCard}>
        <div
          className={css.diagram}
          style={{ "--progress": progress } as CSSProperties}
        >
          <span>{progress}%</span>
          <small>виконано</small>
        </div>

        <div className={css.progressDetails}>
          <span>Місячна ціль</span>
          <h2>Прогрес годин</h2>
          <div className={css.hoursComparison}>
            <p>
              <strong>{Math.round(totalHours / 60)}</strong>
              <span>відпрацьовано</span>
            </p>
            <span aria-hidden="true">/</span>
            <p>
              <strong>{targetTotalHours}</strong>
              <span>годин ціль</span>
            </p>
          </div>
        </div>
      </div>

      <div className={css.statsGrid}>
        <article>
          <span>Зміни</span>
          <strong>{shifts.length}</strong>
        </article>
        <article>
          <span>Денні години</span>
          <strong>{Math.round(dayHours / 60)}</strong>
        </article>
        <article>
          <span>Нічні години</span>
          <strong>{Math.round(nightHours / 60)}</strong>
        </article>
        <article>
          <span>Зароблено</span>
          <strong>€{String(salary).slice(0, 6)}</strong>
        </article>
      </div>
    </section>
  );
};

export default DetailedStats;
