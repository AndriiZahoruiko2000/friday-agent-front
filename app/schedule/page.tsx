import css from "./Page.module.css";
import Calendar from "@/components/schedule/Calendar/Calendar";

const Page = () => {
  return (
    <div className={css.page}>
      <Calendar />
    </div>
  );
};

export default Page;
