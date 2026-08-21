import DetailedStats from "@/components/shifts/DetailedStats/DetailedStats";
import css from "./Page.module.css";

const Page = () => {
  return (
    <div className={css["page"]}>
      <DetailedStats />
    </div>
  );
};

export default Page;
