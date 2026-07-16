import { Budget } from "@/types/budget-types";
import css from "./BudgetCard.module.css";
import { useModal } from "@/hooks/useModal";
import EditBudgetModal from "../EditBudgetModal/EditBudgetModal";
import Modal from "@/components/custom/Modal/Modal";

interface BudgetCardProps {
  item: Budget;
  isActive?: boolean;
}

const BudgetCard = ({ item, isActive = false }: BudgetCardProps) => {
  const [isOpenModal, showModal, hideModal] = useModal();
  const formattedBalance = new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: item.currency,
    maximumFractionDigits: 2,
  }).format(item.balance);

  const createdAt = new Intl.DateTimeFormat("uk-UA", {
    month: "short",
    year: "numeric",
  }).format(new Date(item.createdAt));

  return (
    <li
      className={`${css.card} ${isActive ? css.active : ""}`}
      data-budget-id={item._id}
      aria-current={isActive ? "true" : undefined}
      onClick={showModal}
    >
      <div className={css.topRow}>
        <span className={css.brand}>Friday</span>
        <span className={css.chip} aria-hidden="true" />
      </div>

      <div className={css.balanceGroup}>
        <span className={css.label}>Доступний баланс</span>
        <p className={css.balance}>{formattedBalance}</p>
      </div>

      <div className={css.bottomRow}>
        <div>
          <span className={css.label}>Бюджет</span>
          <p className={css.title}>{item.title}</p>
        </div>
        <div className={css.meta}>
          <span className={css.currency}>{item.currency}</span>
          <time dateTime={item.createdAt}>{createdAt}</time>
        </div>
      </div>
      {isOpenModal && (
        <Modal onClose={hideModal}>
          <EditBudgetModal budgetId={item._id} closeModal={hideModal} />
        </Modal>
      )}
    </li>
  );
};

export default BudgetCard;
