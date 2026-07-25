import css from "./HabitFooter.module.css";
import { GrTrophy } from "react-icons/gr";
import { BsFire } from "react-icons/bs";

const HabitFooter = () => {
  return (
    <div className={css["habitFooter"]}>
      <div className={css["stat"]}>
        <div className={`${css["icon"]} ${css["trophy"]}`} aria-hidden="true">
          <GrTrophy />
        </div>
        <div className={css["text"]}>
          <p className={css["label"]}>Best Streak</p>
          <span className={css["value"]}>15 days</span>
        </div>
      </div>
      <div className={css["stat"]}>
        <div className={`${css["icon"]} ${css["fire"]}`} aria-hidden="true">
          <BsFire />
        </div>
        <div className={css["text"]}>
          <p className={css["label"]}>Total Habits</p>
          <span className={css["value"]}>7</span>
        </div>
      </div>
    </div>
  );
};

export default HabitFooter;
