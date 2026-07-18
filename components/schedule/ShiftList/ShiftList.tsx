"use client";
import { useQuery } from "@tanstack/react-query";
import CreateShiftModal from "../CreateShiftModal/CreateShiftModal";
import css from "./ShiftList.module.css";
import { getShifts } from "@/services/schedule";
import { CSSProperties } from "react";
import { getIconByValue } from "@/helpers/utils";

const ShiftList = () => {
  const shiftsQuery = useQuery({
    queryKey: ["shifts"],
    queryFn: () => getShifts(),
  });

  const shifts = shiftsQuery.data || [];

  return (
    <section className={css.shiftList} aria-labelledby="shift-list-title">
      <div className={css.sectionTitle}>
        <span>Доступні зміни</span>
        {!shiftsQuery.isLoading && (
          <span className={css.counter}>{shifts.length}</span>
        )}
      </div>

      {shiftsQuery.isLoading && (
        <div className={css.loading} role="status">
          <span className={css.spinner} aria-hidden="true" />
          Завантажуємо зміни…
        </div>
      )}

      {!shiftsQuery.isLoading && shifts.length === 0 && (
        <div className={css.empty}>
          <span className={css.emptyIcon} aria-hidden="true">
            🗓️
          </span>
          <strong>Змін поки немає</strong>
          <p>Натисніть «+», щоб створити першу зміну.</p>
        </div>
      )}

      {shifts.length > 0 && (
        <ul className={css.list}>
          <CreateShiftModal />
          {shifts.map((item) => {
            const style = {
              "--shift-color": item.color || "#0a84ff",
            } as CSSProperties;

            return (
              <li className={css.item} key={item._id} style={style}>
                <span className={css.icon} aria-hidden="true">
                  {getIconByValue(item.icon) || "⏱️"}
                </span>
                <span className={css.copy}>
                  <strong>{item.title}</strong>
                  <span className={css.time}>
                    {item.startTime}–{item.endTime}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ShiftList;
