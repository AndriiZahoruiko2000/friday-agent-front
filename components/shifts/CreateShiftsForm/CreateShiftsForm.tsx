"use client";
import { getNightHours, getTotalHours } from "@/helpers/dates";
import css from "./CreateShiftsForm.module.css";
import { createShifts } from "@/services/shiftsService";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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

  const [breaks, setBreaks] = useState<
    { startTime: string; durationMinutes: number }[]
  >([]);

  const addBreak = () => {
    setBreaks((prev) => [
      ...prev,
      {
        startTime: "12:00",
        durationMinutes: 30,
      },
    ]);
  };

  const updateBreak = (
    index: number,
    field: "startTime" | "durationMinutes",
    value: string | number,
  ) => {
    setBreaks((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const removeBreak = (index: number) => {
    setBreaks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (formData: FormData) => {
    const shiftData = {
      date: new Date(formData.get("date") as string).toISOString(),
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      pricePerHour: Number(formData.get("pricePerHour")),
      totalHours: 0,
      nightHours: 0,
      breaks,
    };
    shiftData.totalHours = getTotalHours(
      shiftData.startTime,
      shiftData.endTime,
      breaks,
    );

    shiftData.nightHours = getNightHours(
      shiftData.startTime,
      shiftData.endTime,
      breaks,
    );
    console.log("SHIFT DATA:", shiftData);

    await createShifts(shiftData);
    onClose();

    queryClient.invalidateQueries({
      queryKey: ["shifts"],
    });
  };

  const rate = parseFloat(pricePerHour) || 0;

  const nightHours = getNightHours(startTime, endTime, breaks);
  const totalHours = getTotalHours(startTime, endTime, breaks);
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

          {breaks.map((breakItem, index) => (
            <div className={css.breakRow} key={index}>
              <label className={css.breakField}>
                <span>Початок паузи</span>
                <input
                  type="time"
                  value={breakItem.startTime}
                  onChange={(e) =>
                    updateBreak(index, "startTime", e.target.value)
                  }
                />
              </label>

              <label className={css.breakField}>
                <span>Тривалість, хв</span>
                <input
                  type="number"
                  min="1"
                  value={breakItem.durationMinutes}
                  onChange={(e) =>
                    updateBreak(
                      index,
                      "durationMinutes",
                      Number(e.target.value),
                    )
                  }
                />
              </label>
              <button
                className={css.removeBreak}
                type="button"
                onClick={() => removeBreak(index)}
              >
                Видалити
              </button>
            </div>
          ))}

          <button className={css.addBreak} type="button" onClick={addBreak}>
            + Додати паузу
          </button>

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
            <span>{((totalHours - nightHours) / 60).toFixed(2)}год.</span>
          </p>
          <p className={`${css.calculationRow} ${css.total}`}>
            Орієнтовна оплата
            <span>
              €
              {(
                (nightHours / 60) * rate * 1.25 +
                ((totalHours - nightHours) / 60) * rate
              ).toFixed(2)}
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
