"use client";

import { CSSProperties, MouseEvent, useState } from "react";
import { IoColorPaletteOutline, IoTimeOutline } from "react-icons/io5";
import { getIconByValue } from "@/helpers/utils";
import { Shift } from "@/types/schedule-types";
import IconsSelector from "@/components/custom/IconsSelector/IconsSelector";
import css from "./EditShiftModal.module.css";
import { deleteShifts, updateShifts } from "@/services/schedule";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface EditShiftModalProps {
  shift: Shift;
  closeModal: () => void;
}

const EditShiftModal = ({ shift, closeModal }: EditShiftModalProps) => {
  const [color, setColor] = useState(shift.color || "#0a84ff");
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: FormData) => {
    const shiftData = {
      title: formData.get("title") as string,
      startTime: formData.get("start-time") as string,
      endTime: formData.get("end-time") as string,
      duration: Number(formData.get("duration")),
      color: formData.get("color") as string,
      icon: formData.get("icon") as string,
    };

    await updateShifts(shift._id, shiftData);

    queryClient.invalidateQueries({ queryKey: ["shifts"] });
    queryClient.invalidateQueries({ queryKey: ["shift", shift._id] });

    closeModal();
  };

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await deleteShifts(shift._id);
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
    } catch (error) {
      toast.error(
        "Ця зміна викростовується в календарі та не моєе бути видалена! Видаліть цю зміну з календаря!",
      );
    }

    closeModal();
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <header className={css.header}>
        <span
          className={css.previewIcon}
          style={{ "--preview-color": color } as CSSProperties}
          aria-hidden="true"
        >
          {getIconByValue(shift.icon) || "⏱️"}
        </span>
        <div>
          <span>Робочий графік</span>
          <h2>Редагувати зміну</h2>
          <p>Змініть параметри або видаліть цю зміну.</p>
        </div>
      </header>

      <label className={css.field}>
        <span>Назва</span>
        <input
          type="text"
          name="title"
          defaultValue={shift.title}
          autoComplete="off"
          required
        />
      </label>

      <fieldset className={css.timeGroup}>
        <legend>Час зміни</legend>
        <label>
          <span>Початок</span>
          <span className={css.inputWithIcon}>
            <IoTimeOutline aria-hidden="true" />
            <input
              type="time"
              name="start-time"
              defaultValue={shift.startTime}
              required
            />
          </span>
        </label>
        <label>
          <span>Завершення</span>
          <span className={css.inputWithIcon}>
            <IoTimeOutline aria-hidden="true" />
            <input
              type="time"
              name="end-time"
              defaultValue={shift.endTime}
              required
            />
          </span>
        </label>
      </fieldset>

      <div className={css.detailGrid}>
        <label className={css.field}>
          <span>Тривалість, год</span>
          <input
            type="number"
            name="duration"
            defaultValue={shift.duration}
            min={0.5}
            max={24}
            step={0.5}
            required
          />
        </label>
        <label className={`${css.field} ${css.colorField}`}>
          <span>Колір</span>
          <span className={css.colorControl}>
            <IoColorPaletteOutline aria-hidden="true" />
            <input
              type="color"
              name="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              aria-label="Колір зміни"
            />
          </span>
        </label>
      </div>

      <IconsSelector defaultValue={shift.icon} />

      <div className={css.actions}>
        <button className={css.cancel} type="button" onClick={closeModal}>
          Скасувати
        </button>
        <button className={css.submit} type="submit">
          Зберегти зміни
        </button>
      </div>

      <button className={css.deleteButton} type="button" onClick={handleDelete}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 8v9m4-9v9m4-9v9M5 5h14M9 5V3h6v2m3 0-1 15H7L6 5" />
        </svg>
        Видалити зміну
      </button>
    </form>
  );
};

export default EditShiftModal;
