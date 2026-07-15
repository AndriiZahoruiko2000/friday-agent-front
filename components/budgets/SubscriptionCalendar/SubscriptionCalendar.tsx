import Modal from "@/components/custom/Modal/Modal";
import css from "./SubscriptionCalendar.module.css";
import CreateSubscriptionModal from "../CreateSubscriptionModal/CreateSubscriptionModal";

const SubscriptionCalendar = () => {
  return (
    <div className={css["subscriptionCalendar"]}>
      <Modal>
        <CreateSubscriptionModal />
      </Modal>
    </div>
  );
};

export default SubscriptionCalendar;
