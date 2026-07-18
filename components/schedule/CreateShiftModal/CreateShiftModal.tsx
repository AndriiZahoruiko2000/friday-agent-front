"use client";
import { useModal } from "@/hooks/useModal";
import css from "./CreateShiftModal.module.css";
import Modal from "@/components/custom/Modal/Modal";
import { createShifts } from "@/services/schedule";
import { useQueryClient } from "@tanstack/react-query";
import { IoAdd, IoColorPaletteOutline, IoTimeOutline } from "react-icons/io5";
import IconsSelector from "@/components/custom/IconsSelector/IconsSelector";

const CreateShiftModal = () => {
  const [isOpenModal, showModal, hideModal] = useModal();
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

    await createShifts(shiftData);
    await queryClient.invalidateQueries({ queryKey: ["shifts"] });
    hideModal();
  };

  return (
    <div className={css.createShiftModal}>
      <button
        className={css.trigger}
        type="button"
        onClick={showModal}
        aria-label="Створити нову зміну"
      >
        <IoAdd aria-hidden="true" />
      </button>

      {isOpenModal && (
        <Modal onClose={hideModal}>
          <form className={css.form} action={handleSubmit}>
            <header className={css.formHeader}>
              <span>Робочий графік</span>
              <h2>Нова зміна</h2>
              <p>Додайте назву, час і позначку для календаря.</p>
            </header>

            <label className={css.field}>
              <span>Назва</span>
              <input
                type="text"
                name="title"
                placeholder="Наприклад, Денна"
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
                    defaultValue="09:00"
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
                    defaultValue="18:00"
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
                  defaultValue={8}
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
                    defaultValue="#0a84ff"
                    aria-label="Колір зміни"
                  />
                </span>
              </label>
            </div>

            <IconsSelector />

            <div className={css.actions}>
              <button className={css.cancel} type="button" onClick={hideModal}>
                Скасувати
              </button>
              <button className={css.submit} type="submit">
                Зберегти
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CreateShiftModal;
