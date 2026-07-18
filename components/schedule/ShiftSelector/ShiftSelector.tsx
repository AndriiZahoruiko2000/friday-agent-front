"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import css from "./ShiftSelector.module.css";
import { createSchedule, getShifts } from "@/services/schedule";
import { getIconByValue } from "@/helpers/utils";

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
          return (
            <li key={item._id}>
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
    </section>
  );
};

export default ShiftSelector;
