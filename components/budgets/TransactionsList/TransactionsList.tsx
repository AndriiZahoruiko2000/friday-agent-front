import Modal from "@/components/custom/Modal/Modal";
import css from "./TransactionsList.module.css";
import CreateSubscriptionModal from "../CreateSubscriptionModal/CreateSubscriptionModal";

const TransactionsList = () => {
  return (
    <div className={css["transactionsList"]}>
      <Modal>
        <CreateSubscriptionModal />
      </Modal>
    </div>
  );
};

export default TransactionsList;
