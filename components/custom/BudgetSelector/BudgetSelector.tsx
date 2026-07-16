"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./BudgetSelector.module.css";
import { getBudget } from "@/services/budget";
import { useEffect, useRef, useState } from "react";
import { IoCheckmark, IoChevronDown, IoWalletOutline } from "react-icons/io5";
import { useBudgetStore } from "@/stores/budgetStore";

const BudgetSelector = () => {
  const budgetsQuery = useQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudget({}),
  });

  const budgets = budgetsQuery.data || [];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const currentBudgetId = useBudgetStore((s) => s.currentBudgetId);
  const selectorRef = useRef<HTMLDivElement>(null);
  const selectedBudget =
    budgets.find(
      (budget) => budget._id === selectedId || budget._id === currentBudgetId,
    ) ?? budgets[0];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const selectBudget = (budgetId: string) => {
    setSelectedId(budgetId);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen && budgets[focusedIndex]) {
        selectBudget(budgets[focusedIndex]._id);
      } else {
        const selectedIndex = budgets.findIndex(
          (budget) => budget._id === selectedBudget?._id,
        );
        setFocusedIndex(Math.max(selectedIndex, 0));
        setIsOpen(true);
      }
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    setIsOpen(true);
    setFocusedIndex((current) => {
      const direction = event.key === "ArrowDown" ? 1 : -1;
      return (current + direction + budgets.length) % budgets.length;
    });
  };

  return (
    <div className={css.budgetSelector} ref={selectorRef}>
      <span className={css.label}>Budget</span>
      <input type="hidden" name="budgetId" value={selectedBudget?._id ?? ""} />

      <button
        className={css.trigger}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="budget-options"
        aria-activedescendant={
          isOpen ? `budget-option-${budgets[focusedIndex]?._id}` : undefined
        }
        disabled={budgetsQuery.isPending || budgets.length === 0}
        onClick={() => {
          const selectedIndex = budgets.findIndex(
            (budget) => budget._id === selectedBudget?._id,
          );
          setFocusedIndex(Math.max(selectedIndex, 0));
          setIsOpen((current) => !current);
        }}
        onKeyDown={handleKeyDown}
      >
        <span className={css.wallet} aria-hidden="true">
          <IoWalletOutline />
        </span>
        <span className={css.selection}>
          <strong>
            {budgetsQuery.isPending
              ? "Loading budgets…"
              : (selectedBudget?.title ?? "No budgets available")}
          </strong>
          {selectedBudget && (
            <small>
              {selectedBudget.balance.toLocaleString("uk-UA")}{" "}
              {selectedBudget.currency}
            </small>
          )}
        </span>
        <IoChevronDown
          className={`${css.chevron} ${isOpen ? css.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {budgetsQuery.isError && (
        <p className={css.error}>Could not load budgets</p>
      )}

      {isOpen && budgets.length > 0 && (
        <div
          className={css.dropdown}
          id="budget-options"
          role="listbox"
          aria-label="Select budget"
        >
          {budgets.map((budget, index) => {
            const isSelected = budget._id === selectedBudget?._id;

            return (
              <button
                className={`${css.option} ${
                  index === focusedIndex ? css.focused : ""
                }`}
                id={`budget-option-${budget._id}`}
                key={budget._id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => selectBudget(budget._id)}
              >
                <span className={css.optionIcon} aria-hidden="true">
                  <IoWalletOutline />
                </span>
                <span className={css.optionText}>
                  <strong>{budget.title}</strong>
                  <small>
                    {budget.balance.toLocaleString("uk-UA")} {budget.currency}
                  </small>
                </span>
                {isSelected && (
                  <IoCheckmark className={css.checkmark} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetSelector;
