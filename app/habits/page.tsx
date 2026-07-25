import HabitOverview from "@/components/habits/HabitOverview/HabitOverview";
import css from "./Page.module.css";
import HabitsList from "@/components/habits/HabitsList/HabitsList";
import HabitFooter from "@/components/habits/HabitFooter/HabitFooter";

const Page = () => {
  return (
    <div className={css["page"]}>
      <HabitOverview />
      <HabitsList />
      <HabitFooter />
    </div>
  );
};

export default Page;
