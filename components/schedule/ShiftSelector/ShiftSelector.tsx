"use client";
import { CSSProperties } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import css from "./ShiftSelector.module.css";
import { createSchedule, getSchedule, getShifts } from "@/services/schedule";
import { getIconByValue } from "@/helpers/utils";
import ScheduleItem from "./ScheduleItem/ScheduleItem";

interface ShiftSelectorProps {
  date?: Date;
  onClose?: () => void;
}

const ShiftSelector = ({ date, onClose }: ShiftSelectorProps) => {
  const queryClient = useQueryClient();

  const shiftsQuery = useQuery({
    queryKey: ["shifts"],
    queryFn: () => getShifts(),
  });

  const shifts = shiftsQuery.data || [];

  const scheduleQuery = useQuery({
    queryKey: [
      "schedule",
      {
        startDate: date?.toISOString(),
        endDate: date?.toISOString(),
      },
    ],
    queryFn: () =>
      getSchedule({
        startDate: date?.toISOString(),
        endDate: date?.toISOString(),
      }),
  });

  const schedule = scheduleQuery.data || [];

  const handleSubmit = async (shiftId: string) => {
    if (!date) return;

    await createSchedule({
      scheduleShiftId: shiftId,
      date: date.toISOString(),
    });

    queryClient.invalidateQueries({
      queryKey: ["schedule"],
    });

    onClose?.();
  };

  if (!date) {
    return (
      <section className={css.legend} aria-label="Типи змін">
        {shiftsQuery.isLoading && (
          <p className={css.status}>Завантажуємо типи змін…</p>
        )}
        {shifts.map((item) => (
          <div className={css.legendItem} key={item._id}>
            <span className={css.icon} aria-hidden="true">
              {item.icon}
            </span>
            <span className={css.legendCopy}>
              <strong>
                {item.startTime}–{item.endTime}
              </strong>
              <span>{item.title}</span>
            </span>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className={css.picker}>
      <div className={css.pickerHeader}>
        <span>Зміна на день</span>
        <h2>
          {new Intl.DateTimeFormat("uk-UA", {
            day: "numeric",
            month: "long",
          }).format(date)}
        </h2>
      </div>
      <ul className={css.shiftList}>
        {shifts.map((item) => {
          const shiftStyle = {
            "--shift-color": item.color || "#0a84ff",
          } as CSSProperties;

          return (
            <li key={item._id} style={shiftStyle}>
              <button type="button" onClick={() => handleSubmit(item._id)}>
                <span className={css.pickerIcon} aria-hidden="true">
                  {getIconByValue(item.icon)}
                </span>
                <span className={css.pickerCopy}>
                  <strong>{item.title}</strong>
                  <span>
                    {item.startTime}–{item.endTime}
                  </span>
                </span>
                <span className={css.chevron} aria-hidden="true">
                  ›
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <section className={css.currentSchedule} aria-labelledby="schedule-title">
        <div className={css.sectionHeader}>
          <div>
            <span>Поточний розклад</span>
            <h3 id="schedule-title">Заплановано на цей день</h3>
          </div>
          {schedule.length > 0 && (
            <span className={css.count}>{schedule.length}</span>
          )}
        </div>

        {scheduleQuery.isLoading ? (
          <div className={css.scheduleStatus}>
            <span className={css.spinner} aria-hidden="true"></span>
            Завантажуємо розклад…
          </div>
        ) : schedule.length > 0 ? (
          <>
            <ul className={css.scheduleList}>
              {schedule.map((item) => {
                return <ScheduleItem item={item} key={item._id} />;
              })}
            </ul>
            <p className={css.swipeHint}>Проведіть вліво, щоб видалити</p>
          </>
        ) : (
          <div className={css.emptySchedule}>
            <span aria-hidden="true">＋</span>
            <div>
              <strong>Зміну ще не вибрано</strong>
              <p>Оберіть одну зі змін вище.</p>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default ShiftSelector;
