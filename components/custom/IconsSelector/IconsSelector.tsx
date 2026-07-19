import css from "./IconsSelector.module.css";
import { MdOutlineWbSunny, MdOutlineNightlight } from "react-icons/md";
import {
  IoBriefcaseOutline,
  IoCafeOutline,
  IoHomeOutline,
  IoMedicalOutline,
} from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";

export const iconsList = [
  {
    value: "☀️",
    title: "Денна",
    icon: <MdOutlineWbSunny />,
    color: "orange",
  },
  {
    value: "🌤️",
    title: "Ранкова",
    icon: <MdOutlineWbSunny />,
    color: "yellow",
  },
  {
    value: "🌙",
    title: "Нічна",
    icon: <BsFillMoonStarsFill />,
    color: "purple",
  },
  {
    value: "🌆",
    title: "Вечірня",
    icon: <MdOutlineNightlight />,
    color: "indigo",
  },
  {
    value: "💼",
    title: "Офіс",
    icon: <IoBriefcaseOutline />,
    color: "blue",
  },
  {
    value: "☕",
    title: "Перерва",
    icon: <IoCafeOutline />,
    color: "brown",
  },
  {
    value: "🏠",
    title: "Вдома",
    icon: <IoHomeOutline />,
    color: "green",
  },
  {
    value: "🏥",
    title: "Чергова",
    icon: <IoMedicalOutline />,
    color: "red",
  },
];

interface IconsSelectorProps {
  defaultValue?: string;
}

const IconsSelector = ({ defaultValue = iconsList[0].value }: IconsSelectorProps) => {
  const selectedValue = iconsList.some((item) => item.value === defaultValue)
    ? defaultValue
    : iconsList[0].value;

  return (
    <fieldset className={css.iconsSelector}>
      <legend>Іконка</legend>
      <div className={css.track}>
        {iconsList.map((item) => (
          <label
            className={css.option}
            data-color={item.color}
            key={item.value}
          >
            <input
              className={css.input}
              type="radio"
              name="icon"
              value={item.value}
              defaultChecked={item.value === selectedValue}
              required
            />
            <span className={css.button}>
              <span className={css.icon} aria-hidden="true">
                {item.icon}
              </span>
              <span className={css.title}>{item.title}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default IconsSelector;
