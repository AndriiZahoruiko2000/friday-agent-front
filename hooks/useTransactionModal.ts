"use client";
import { useBudgetStore } from "@/stores/budgetStore";

type UseModalResponse = [boolean, () => void, () => void];

export const useTransactionModal = (): UseModalResponse => {
  const isOpenTransactionModal = useBudgetStore(
    (s) => s.isOpenTransactionModal,
  );
  const setIsOpenTransactionModal = useBudgetStore(
    (s) => s.setIsOpenTransactionModal,
  );

  const showModal = () => {
    setIsOpenTransactionModal(true);
  };

  const hideModal = () => {
    setIsOpenTransactionModal(false);
  };

  return [isOpenTransactionModal, showModal, hideModal];
};
