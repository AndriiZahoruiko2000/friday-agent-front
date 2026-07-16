import { useState } from "react";

type UseModalResponse = [boolean, () => void, () => void, () => void];

export const useModal = (): UseModalResponse => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const showModal = () => {
    setIsOpenModal(true);
  };

  const hideModal = () => {
    setIsOpenModal(false);
  };

  const toggle = () => {
    setIsOpenModal(!isOpenModal);
  };

  return [isOpenModal, showModal, hideModal, toggle];
};
