"use client";
import CreateTransactionsModal from "@/components/budgets/CreateTransactionsModal/CreateTransactionsModal";
import Modal from "../Modal/Modal";
import css from "./GlobalModals.module.css";
import { useTransactionModal } from "@/hooks/useTransactionModal";

const GlobalModals = () => {
  const [isOpenTransactionModal, , hideTransactionModal] =
    useTransactionModal();
  return (
    <>
      {isOpenTransactionModal && (
        <Modal onClose={hideTransactionModal}>
          <CreateTransactionsModal />
        </Modal>
      )}
    </>
  );
};

export default GlobalModals;
