import { getShifts } from "@/services/shiftsService";
import { useQuery } from "@tanstack/react-query";

export const useShifts = (startTime: Date, endTime: Date) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  const shiftsListQuery = useQuery({
    queryKey: [
      "shifts",
      {
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      },
    ],
    queryFn: () =>
      getShifts({
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      }),
  });

  const shifts = shiftsListQuery.data ?? [];

  const totalHours = shifts.reduce((acc, shift) => {
    return acc + shift.totalHours;
  }, 0);

  const nightHours = shifts.reduce((acc, shift) => {
    return acc + shift.nightHours;
  }, 0);

  const dayHours = totalHours - nightHours;

  const salary = shifts.reduce((acc, shift) => {
    const shiftDayHours = shift.totalHours - shift.nightHours;

    const shiftSalary =
      (shift.nightHours / 60) * shift.pricePerHour * 1.25 +
      (shiftDayHours / 60) * shift.pricePerHour;

    return acc + shiftSalary;
  }, 0);

  return {
    shifts,
    totalHours,
    nightHours,
    salary,
    dayHours,
  };
};
