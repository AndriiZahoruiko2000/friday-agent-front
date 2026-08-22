"use client";
import { getNightHours, getTotalHours } from "@/helpers/dates";
import css from "./CreateShiftsForm.module.css";
import { createShifts } from "@/services/shiftsService";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useShiftsStore } from "@/stores/shiftsStore";

interface CreateShiftsFormProps {
  initialDate?: Date;
  onClose: () => void;
}

const CreateShiftsForm = ({ initialDate, onClose }: CreateShiftsFormProps) => {
  const queryClient = useQueryClient();
  const storePricePerHour = useShiftsStore((state) => state.pricePerHour);
  const [pricePerHour, setPricePerHour] = useState(String(storePricePerHour));

  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("16:00");

  const handleSubmit = async (formData: FormData) => {
    const shiftData = {
      date: new Date(formData.get("date") as string).toISOString(),
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      pricePerHour: Number(formData.get("pricePerHour")),
      totalHours: 0,
      nightHours: 0,
    };
    shiftData.totalHours = getTotalHours(
      shiftData.startTime,
      shiftData.endTime,
    );

    shiftData.nightHours = getNightHours(
      shiftData.startTime,
      shiftData.endTime,
    );

    await createShifts(shiftData);
    onClose();

    queryClient.invalidateQueries({
      queryKey: ["shifts"],
    });
  };

  const rate = parseFloat(pricePerHour) || 0;

  const nightHours = getNightHours(startTime, endTime);
  const totalHours = getTotalHours(startTime, endTime);
  const dateValue = initialDate
    ? `${initialDate.getFullYear()}-${String(initialDate.getMonth() + 1).padStart(2, "0")}-${String(initialDate.getDate()).padStart(2, "0")}`
    : undefined;

  return (
    <div className={css["createShiftsForm"]}>
      <form className={css.form} action={handleSubmit}>
        <div className={css.fields}>
          <label className={css.dateField}>
            <span>Дата</span>
            <input type="date" name="date" defaultValue={dateValue} required />
          </label>

          <div className={css.timeFields}>
            <label>
              <span>Початок</span>
              <input
                type="time"
                name="startTime"
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
                value={startTime}
              />
            </label>
            <label>
              <span>Кінець</span>
              <input
                type="time"
                name="endTime"
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
                value={endTime}
              />
            </label>
          </div>

          <label className={css.priceField}>
            <span>Ставка за годину</span>
            <input
              type="number"
              name="pricePerHour"
              min="0"
              step="0.01"
              required
              value={pricePerHour}
              onChange={(e) => {
                setPricePerHour(e.target.value);
              }}
            />
          </label>
        </div>

        <div className={css.calculation}>
          <p className={css.calculationTitle}>Попередній розрахунок</p>
          <p className={css.calculationRow}>
            Всього годин
            <span>{totalHours / 60} год.</span>
          </p>
          <p className={css.calculationRow}>
            Нічних годин(23:00 - 05:00)
            <span>{nightHours / 60} год.</span>
          </p>
          <p className={css.calculationRow}>
            Денних годин
            <span>{(totalHours - nightHours) / 60}год.</span>
          </p>
          <p className={`${css.calculationRow} ${css.total}`}>
            Орієнтовна оплата
            <span>
              €
              {(nightHours / 60) * rate * 1.25 +
                ((totalHours - nightHours) / 60) * rate}
            </span>
          </p>
          <div className={css.notice}>
            <p>Нічна надбавка +25%</p>
            <p>Нічними вважаються години з 23:00 до 05:00</p>
          </div>
        </div>

        <button className={css.submit} type="submit">
          Додати зміну
        </button>
      </form>
    </div>
  );
};

export default CreateShiftsForm;
