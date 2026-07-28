import css from "./HabitIconSelector.module.css";
import { IoWater } from "react-icons/io5";
import { FcSportsMode } from "react-icons/fc";
import { FaBookReader } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import { GrYoga } from "react-icons/gr";
import { GiMedicines } from "react-icons/gi";

const habitIcons = [
  { iconName: "IoWater", icon: <IoWater /> },
  { iconName: "FcSportsMode", icon: <FcSportsMode /> },
  { iconName: "FaBookReader", icon: <FaBookReader /> },
  { iconName: "GiMeditation", icon: <GiMeditation /> },
  { iconName: "GrYoga", icon: <GrYoga /> },
  { iconName: "GiMedicines", icon: <GiMedicines /> },
];

const HabitIconSelector = () => {
  return (
    <div className={css["habitIconSelector"]}>
      <div className={css["iconGrid"]}>
        {habitIcons.map((item) => {
          return (
            <label className={css["iconOption"]} key={item.iconName}>
              <input
                type="radio"
                value={item.iconName}
                name="iconName"
                defaultChecked={item.iconName === habitIcons[0].iconName}
                aria-label={item.iconName}
                required
              />
              <span aria-hidden="true">{item.icon}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default HabitIconSelector;
