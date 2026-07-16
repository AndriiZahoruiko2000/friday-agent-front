"use client";

import { Transaction } from "@/types/transaction-types";
import css from "./TransactionCard.module.css";
import { transactionCategories } from "../../TransactionCategoryList/TransactionCategoryList";
import { PointerEvent, useRef, useState } from "react";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { deleteTransaction } from "@/services/transaction";
import { useQueryClient } from "@tanstack/react-query";
import EditTransactionModal from "../../EditTransactionModal/EditTransactionModal";
import Modal from "@/components/custom/Modal/Modal";
import { useModal } from "@/hooks/useModal";

interface TransactionCardProps {
  item: Transaction;
}

const TransactionCard = ({ item }: TransactionCardProps) => {
  const ACTIONS_WIDTH = 144;
  const category =
    transactionCategories[item.category] ??
    transactionCategories["no-category"];
  const isWithdraw = item.transactionType === "withdraw";
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ x: 0, offset: 0, time: 0, moved: false });

  const formattedAmount = new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: item.currency,
    maximumFractionDigits: 2,
  }).format(item.amount);

  const formattedTime = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(item.createdAt));

  const queryClient = useQueryClient();
  const [isOpenModal, showModal, hideModal] = useModal();

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      x: event.clientX,
      offset,
      time: performance.now(),
      moved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const distance = event.clientX - dragRef.current.x;
    if (Math.abs(distance) > 5) dragRef.current.moved = true;
    setOffset(
      Math.max(-ACTIONS_WIDTH, Math.min(0, dragRef.current.offset + distance)),
    );
  };

  const finishSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const distance = event.clientX - dragRef.current.x;
    const duration = Math.max(performance.now() - dragRef.current.time, 1);
    const velocity = distance / duration;
    const finalOffset = Math.max(
      -ACTIONS_WIDTH,
      Math.min(0, dragRef.current.offset + distance),
    );
    const shouldOpen = finalOffset < -ACTIONS_WIDTH / 2 || velocity < -0.5;
    const shouldClose = finalOffset > -ACTIONS_WIDTH / 2 || velocity > 0.5;

    setIsDragging(false);
    setOffset(shouldOpen && !shouldClose ? -ACTIONS_WIDTH : 0);
  };

  const handleEdit = async () => {
    showModal();
  };

  const handleDelete = async () => {
    await deleteTransaction(item._id);

    queryClient.invalidateQueries({
      queryKey: ["budgets"],
    });

    queryClient.invalidateQueries({
      queryKey: ["transactions", item.budgetId],
    });
  };

  return (
    <li className={css.transactionCard}>
      <div className={css.actions} aria-hidden={offset === 0}>
        <button
          type="button"
          className={css.edit}
          disabled={offset === 0}
          onClick={handleEdit}
        >
          <IoPencilOutline aria-hidden="true" />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className={css.delete}
          disabled={offset === 0}
          onClick={handleDelete}
        >
          <IoTrashOutline aria-hidden="true" />
          <span>Delete</span>
        </button>
      </div>

      <div
        className={`${css.content} ${isDragging ? css.dragging : ""}`}
        style={{ transform: `translate3d(${offset}px, 0, 0)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishSwipe}
        onPointerCancel={finishSwipe}
        onClick={() => {
          if (!dragRef.current.moved && offset !== 0) setOffset(0);
        }}
      >
        <span
          className={css.categoryIcon}
          data-color={category.color}
          aria-hidden="true"
        >
          {category.icon}
        </span>
        <span className={css.details}>
          <strong>{category.title}</strong>
          <small>{item.note || formattedTime}</small>
        </span>
        <span className={css.meta}>
          <strong className={isWithdraw ? css.expense : css.income}>
            {isWithdraw ? "−" : "+"}
            {formattedAmount}
          </strong>
          <small>{formattedTime}</small>
        </span>
      </div>
      {isOpenModal && (
        <Modal onClose={hideModal}>
          <EditTransactionModal
            closeModal={hideModal}
            transactionId={item._id}
          />
        </Modal>
      )}
    </li>
  );
};

export default TransactionCard;
