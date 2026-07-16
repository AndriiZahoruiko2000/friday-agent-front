import Modal from "@/components/custom/Modal/Modal";
import css from "./CreateBudgetCard.module.css";
import CreateBudgetModal from "../CreateBudgetModal/CreateBudgetModal";
import { useModal } from "@/hooks/useModal";

const CreateBudgetCard = () => {
  const [isOpenModal, showModal, hideModal] = useModal();

  return (
    <>
      <li className={css.card}>
        <button
          className={css.button}
          type="button"
          onClick={showModal}
          aria-label="Створити новий бюджет"
        >
          <span className={css.icon} aria-hidden="true">
            <span />
            <span />
          </span>
          <span className={css.title}>Новий бюджет</span>
          <span className={css.description}>Додати рахунок</span>
        </button>
      </li>
      {isOpenModal && (
        <Modal onClose={hideModal}>
          <CreateBudgetModal closeModal={hideModal} />
        </Modal>
      )}
    </>
  );
};

export default CreateBudgetCard;
