import DateSelector from "../DateSelector/DateSelector";
import NextShift from "../NextShift/NextShift";
import ShiftList from "../ShiftList/ShiftList";

import WeekList from "../WeekList/WeekList";
import css from "./Calendar.module.css";
import CalendarBody from "./CalendarBody/CalendarBody";

const Calendar = () => {
  return (
    <section className={css.calendar} aria-label="Календар змін">
      <header className={css.header}>
        <p className={css.eyebrow}>Робочий графік</p>
        <h1>Календар змін</h1>
      </header>

      <DateSelector />
      <ShiftList />

      <div className={css.calendarSurface}>
        <WeekList />
        <CalendarBody />
      </div>

      <NextShift />
    </section>
  );
};

export default Calendar;
