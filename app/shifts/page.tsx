import ShortStats from "@/components/shifts/ShortStats/ShortStats";
import css from "./Page.module.css";
import ShiftsCalendar from "@/components/shifts/ShiftsCalendar/ShiftsCalendar";

import NextShifts from "@/components/shifts/NextShifts/NextShifts";
import LastShifts from "@/components/shifts/LastShifts/LastShifts";

import MonthSelector from "@/components/shifts/MonthSelector/MonthSelector";

const Page = () => {
  return (
    <div className={css["page"]}>
      <MonthSelector />
      <ShortStats />
      <ShiftsCalendar />
      {/* <NextShifts /> */}
      <LastShifts />
    </div>
  );
};

export default Page;
