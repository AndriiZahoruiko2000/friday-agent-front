import css from "./Modal.module.css";
interface ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return <div className={css["modal"]}>{children}</div>;
};

export default Modal;
