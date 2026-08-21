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

import { useQuery } from "@tanstack/react-query";
import { getShifts } from "@/services/shiftsService";
import CalendarCard from "./CalendarCard/CalendarCard";
import { useShiftsStore } from "@/stores/shiftsStore";
import { useState } from "react";

const ShiftsCalendar = () => {
  const [isOpenModal, showModal, hideModal] = useModal();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const currentDate = useShiftsStore((s) => s.date);

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

  const firstDay = getFirstDateOfMonth(currentDate);
  const lastDay = getLastDateOfMonth(currentDate);

  const firstDayOfWeek = getFirstDateOfWeek(firstDay);

  const rangeDates = getRangeDates(firstDayOfWeek, lastDay);

  const shiftsQuery = useQuery({
    queryKey: [
      "shifts",
      {
        startTime: firstDay.toISOString(),
        endTime: lastDay.toISOString(),
      },
    ],
    queryFn: () =>
      getShifts({
        startTime: firstDay.toISOString(),
        endTime: lastDay.toISOString(),
      }),
  });

  const shifts = shiftsQuery.data || [];

  return (
    <div className={css["shiftsCalendar"]}>
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
          <CreateShiftsForm initialDate={selectedDate} />
        </Modal>
      )}
    </div>
  );
};

export default ShiftsCalendar;
