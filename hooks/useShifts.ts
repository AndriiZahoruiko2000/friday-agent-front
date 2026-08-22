import { getShifts } from "@/services/shiftsService";
import { useShiftsStore } from "@/stores/shiftsStore";
import { useQuery } from "@tanstack/react-query";

export const useShifts = (startTime: Date, endTime: Date) => {
  const pricePerHour = useShiftsStore((s) => s.pricePerHour);
  const shiftsListQuery = useQuery({
    queryKey: [
      "shifts",
      {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    ],
    queryFn: () =>
      getShifts({
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      }),
  });

  const shifts = shiftsListQuery.data || [];

  const totalHours = shifts.reduce((acc, el) => {
    return acc + el.totalHours;
  }, 0);

  const nightHours = shifts.reduce((acc, el) => {
    return acc + el.nightHours;
  }, 0);

  const dayHours = totalHours - nightHours;

  const salary = shifts.reduce((acc, el) => {
    const shiftDayHours = el.totalHours - el.nightHours;

    const shiftSalary =
      (el.nightHours / 60) * el.pricePerHour * 1.25 +
      (shiftDayHours / 60) * el.pricePerHour;

    return acc + shiftSalary;
  }, 0);

  return { shifts, totalHours, nightHours, salary, dayHours };
};
