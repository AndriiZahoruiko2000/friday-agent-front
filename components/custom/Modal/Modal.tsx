"use client";

import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import {
  CSSProperties,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

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

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    const previousOverscrollBehavior = root.style.overscrollBehavior;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    root.style.overscrollBehavior = "none";

    return () => {
      body.style.overflow = previousBodyStyles.overflow;
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      root.style.overscrollBehavior = previousOverscrollBehavior;
      window.scrollTo(0, scrollY);
    };
  }, []);

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

  return createPortal(
    <div
      className={`${css.modal} ${isClosing ? css.closing : ""}`}
      role="presentation"
      style={modalStyle}
    >
      <div
        className={css.backdrop}
        aria-hidden="true"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      />
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
    </div>,
    document.querySelector("#modal-section") as Element,
  );
};

export default Modal;
