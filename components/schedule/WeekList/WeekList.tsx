import css from "./WeekList.module.css";

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const WeekList = () => {
  return (
    <ul className={css["week-list"]}>
      {days.map((item) => {
        return (
          <li key={item} className={css["week-item"]}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default WeekList;
