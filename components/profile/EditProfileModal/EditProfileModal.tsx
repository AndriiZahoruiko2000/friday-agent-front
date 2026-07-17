"use client";
import { useModal } from "@/hooks/useModal";
import css from "./EditProfileModal.module.css";
import Modal from "@/components/custom/Modal/Modal";
import {
  IoChevronForward,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";

const EditProfileModal = () => {
  const [isOpenModal, showModal, hideModal] = useModal();

  const handleEdit = async (formData: FormData) => {
    const data = {
      nickname: formData.get("nickname") as string,
      email: formData.get("email") as string,
    };
    console.log(data);
  };

  return (
    <div className={css.editProfileModal}>
      <button className={css.editButton} type="button" onClick={showModal}>
        <span className={css.buttonIcon} aria-hidden="true">
          <IoPersonOutline />
        </span>
        <span>Edit Profile</span>
        <IoChevronForward className={css.chevron} aria-hidden="true" />
      </button>
      {isOpenModal && (
        <Modal onClose={hideModal}>
          <form className={css.form} action={handleEdit}>
            <div className={css.formHeader}>
              <p>Account</p>
              <h2>Edit Profile</h2>
              <span>Update the details visible in your profile.</span>
            </div>

            <div className={css.fields}>
              <label>
                <span>Nickname</span>
                <div className={css.inputControl}>
                  <IoPersonOutline aria-hidden="true" />
                  <input
                    type="text"
                    name="nickname"
                    placeholder="Your nickname"
                    autoComplete="nickname"
                  />
                </div>
              </label>

              <label>
                <span>Email</span>
                <div className={css.inputControl}>
                  <IoMailOutline aria-hidden="true" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                </div>
              </label>
            </div>

            <div className={css.actions}>
              <button type="button" onClick={hideModal}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default EditProfileModal;
