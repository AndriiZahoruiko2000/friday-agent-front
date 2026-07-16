"use client";

import css from "./Modal.module.css";
import { CSSProperties, PointerEvent, useRef, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ y: 0, time: 0 });

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (isClosing) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = { y: event.clientY, time: performance.now() };
    setIsDragging(true);
    setDragY(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isClosing) return;
    setDragY(Math.max(0, event.clientY - dragStartRef.current.y));
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isClosing) return;

    const distance = Math.max(0, event.clientY - dragStartRef.current.y);
    const duration = Math.max(performance.now() - dragStartRef.current.time, 1);
    const velocity = distance / duration;
    const sheetHeight = sheetRef.current?.offsetHeight ?? window.innerHeight;
    const distanceThreshold = Math.min(140, sheetHeight * 0.25);
    const shouldClose =
      distance >= distanceThreshold || (distance > 32 && velocity > 0.65);

    setIsDragging(false);
    if (shouldClose) {
      setDragY(distance);
      setIsClosing(true);
    } else {
      setDragY(0);
    }
  };

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && isClosing) onClose();
  };

  const progress = Math.min(dragY / 320, 1);
  const modalStyle = {
    "--drag-y": `${dragY}px`,
    "--backdrop-opacity": String(1 - progress * 0.85),
  } as CSSProperties;

  return (
    <div
      className={`${css.modal} ${isClosing ? css.closing : ""}`}
      role="presentation"
      style={modalStyle}
    >
      <div className={css.backdrop} aria-hidden="true" />
      <div
        className={`${css.sheet} ${isDragging ? css.dragging : ""}`}
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          className={css.dragArea}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <div className={css.handle} aria-hidden="true" />
        </div>
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
