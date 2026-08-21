import { Shift } from "@/types/shifts";
import css from "./ShiftCard.module.css";

interface ShiftCardProps {
  shift: Shift;
}

const ShiftCard = ({ shift }: ShiftCardProps) => {
  return (
    <li className={css.card}>
      <p>{new Date(shift.date).toLocaleDateString("uk-UA")}</p>
      <p>
        <span>{shift.startTime}</span>
        <span>{shift.endTime}</span>
      </p>
      <p>{shift.nightHours / 60}</p>
      <p>{shift.totalHours / 60}</p>
      <p>
        {(shift.nightHours / 60) * 15 * 1.25 +
          ((shift.totalHours - shift.nightHours) / 60) * 15}
      </p>
    </li>
  );
};

export default ShiftCard;
