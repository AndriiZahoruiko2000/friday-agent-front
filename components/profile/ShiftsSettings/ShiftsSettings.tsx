"use client";
import { useShiftsStore } from "@/stores/shiftsStore";
import css from "./ShiftsSettings.module.css";
import { IoCashOutline, IoMoonOutline, IoTimeOutline } from "react-icons/io5";

const ShiftsSettings = () => {
  const totalHours = useShiftsStore((s) => s.totalHours);
  const setTotalHours = useShiftsStore((s) => s.setTotalHours);
  const nightHours = useShiftsStore((s) => s.nightHours);
  const setNightHours = useShiftsStore((s) => s.setNightHours);
  const pricePerHour = useShiftsStore((s) => s.pricePerHour);
  const setPricePerHour = useShiftsStore((s) => s.setPricePerHour);

  return (
    <section className={css.shiftsSettings}>
      <div className={css.header}>
        <div>
          <span>Робота</span>
          <h2>Налаштування змін</h2>
        </div>
        <span className={css.headerIcon} aria-hidden="true">
          <IoTimeOutline />
        </span>
      </div>

      <div className={css.settingsList}>
        <label className={css.settingRow}>
          <span className={`${css.icon} ${css.hoursIcon}`} aria-hidden="true">
            <IoTimeOutline />
          </span>
          <span className={css.label}>Бажані години праці</span>
          <span className={css.control}>
            <input
              type="number"
              name="totalHours"
              aria-label="Тривалість зміни"
              value={totalHours}
              onChange={(e) => {
                setTotalHours(Number(e.target.value));
              }}
            />
            <span>год</span>
          </span>
        </label>

        <label className={css.settingRow}>
          <span className={`${css.icon} ${css.nightIcon}`} aria-hidden="true">
            <IoMoonOutline />
          </span>
          <span className={css.label}>Нічні години</span>
          <span className={css.control}>
            <input
              type="number"
              name="nightHours"
              aria-label="Нічні години"
              value={nightHours}
              onChange={(e) => {
                setNightHours(Number(e.target.value));
              }}
            />
            <span>год</span>
          </span>
        </label>

        <label className={css.settingRow}>
          <span className={`${css.icon} ${css.priceIcon}`} aria-hidden="true">
            <IoCashOutline />
          </span>
          <span className={css.label}>Ставка за годину</span>
          <span className={css.control}>
            <input
              type="number"
              name="pricePerHour"
              aria-label="Ставка за годину"
              value={pricePerHour}
              onChange={(e) => {
                setPricePerHour(Number(e.target.value));
              }}
            />
            <span>€</span>
          </span>
        </label>
      </div>

      <p className={css.caption}>
        Ці значення використовуються для розрахунку статистики змін.
      </p>
    </section>
  );
};

export default ShiftsSettings;
