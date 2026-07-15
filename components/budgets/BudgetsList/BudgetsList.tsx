import Modal from "@/components/custom/Modal/Modal";
import css from "./BudgetsList.module.css";
import CreateBudgetModal from "../CreateBudgetModal/CreateBudgetModal";

const BudgetsList = () => {
  return (
    <div className={css["budgetsList"]}>
      <Modal>
        <CreateBudgetModal />
      </Modal>
    </div>
  );
};

export default BudgetsList;
