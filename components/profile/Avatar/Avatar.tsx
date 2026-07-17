import css from "./Avatar.module.css";
import { IoPersonCircleOutline } from "react-icons/io5";

const Avatar = () => {
  return (
    <div className={css.avatar} aria-label="Profile avatar">
      <IoPersonCircleOutline aria-hidden="true" />
      <span className={css.status} aria-label="Online" />
    </div>
  );
};

export default Avatar;
