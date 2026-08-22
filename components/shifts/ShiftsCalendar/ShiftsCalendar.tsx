"use client";
import {
  getFirstDateOfMonth,
  getFirstDateOfWeek,
  getLastDateOfMonth,
  getRangeDates,
} from "@/helpers/dates";
import css from "./ShiftsCalendar.module.css";

import { useModal } from "@/hooks/useModal";
import Modal from "@/components/custom/Modal/Modal";
import CreateShiftsForm from "../CreateShiftsForm/CreateShiftsForm";

import CalendarCard from "./CalendarCard/CalendarCard";
import { useShiftsStore } from "@/stores/shiftsStore";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineCalendarMonth } from "react-icons/md";

import { useState } from "react";
import ShiftsListByDate from "./ShiftsListByDate/ShiftsListByDate";
import { useShifts } from "@/hooks/useShifts";

const ShiftsCalendar = () => {
  const [isOpenModal, showModal, hideModal] = useModal();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const currentDate = useShiftsStore((s) => s.date);

  const [isCreateModal, setIsCreateModal, setIsListModal] = useModal();

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

  const firstDay = getFirstDateOfMonth(currentDate);
  const lastDay = getLastDateOfMonth(currentDate);

  const firstDayOfWeek = getFirstDateOfWeek(firstDay);

  firstDayOfWeek.setUTCHours(0);
  firstDayOfWeek.setUTCMinutes(0);
  firstDayOfWeek.setUTCSeconds(0);
  firstDayOfWeek.setUTCMilliseconds(0);

  const rangeDates = getRangeDates(firstDayOfWeek, lastDay);
  const { shifts } = useShifts(firstDay, lastDay);

  return (
    <div className={css["shiftsCalendar"]}>
      <div className={css.header}>
        <p className={css["title"]}>Календар</p>
        <div className={css.actions}>
          {!isCreateModal && (
            <button
              className={css.actionButton}
              type="button"
              aria-label="Додати зміну"
              onClick={setIsCreateModal}
            >
              <FaPlus aria-hidden="true" />
            </button>
          )}
          {isCreateModal && (
            <button
              className={css.actionButton}
              type="button"
              aria-label="Показати календар"
              onClick={setIsListModal}
            >
              <MdOutlineCalendarMonth aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <ul className={css["shifts-calendar"]}>
        {days.map((item) => {
          return <li key={item}>{item}</li>;
        })}
        {rangeDates.map((item, index) => {
          return (
            <CalendarCard
              key={index}
              date={item}
              shifts={shifts}
              onSelect={(date) => {
                setSelectedDate(date);
                showModal();
              }}
            />
          );
        })}
      </ul>
      {isOpenModal && (
        <Modal onClose={hideModal}>
          {isCreateModal && (
            <CreateShiftsForm initialDate={selectedDate} onClose={hideModal} />
          )}
          {!isCreateModal && <ShiftsListByDate initialDate={selectedDate} />}
        </Modal>
      )}
    </div>
  );
};

export default ShiftsCalendar;
