"use client";
import css from "./BudgetsList.module.css";
import { useQuery } from "@tanstack/react-query";
import { getBudget } from "@/services/budget";
import BudgetCard from "../BudgetCard/BudgetCard";
import CreateBudgetCard from "../CreateBudgetCard/CreateBudgetCard";
import { UIEvent, useEffect, useRef, useState } from "react";
import { useBudgetStore } from "@/stores/budgetStore";

interface BudgetsListProps {
  showNewCard?: boolean;
}

const BudgetsList = ({ showNewCard = true }: BudgetsListProps) => {
  const budgetsQuery = useQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudget({}),
  });
  const setCurrentBudgetId = useBudgetStore((s) => s.setCurrentBudgetId);
  const budgets = budgetsQuery.data || [];
  const [activeBudgetId, setActiveBudgetId] = useState<string | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const selectedBudgetId = activeBudgetId ?? budgets[0]?._id ?? null;

  useEffect(() => {
    setCurrentBudgetId(selectedBudgetId);
  }, [selectedBudgetId, setCurrentBudgetId]);

  const updateActiveBudget = (track: HTMLUListElement) => {
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    const cards = track.querySelectorAll<HTMLElement>("[data-budget-id]");
    let closestId: string | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(trackCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = card.dataset.budgetId ?? null;
      }
    });

    if (closestId) setActiveBudgetId(closestId);
  };

  const handleScroll = (event: UIEvent<HTMLUListElement>) => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const track = event.currentTarget;
    animationFrameRef.current = requestAnimationFrame(() => {
      updateActiveBudget(track);
      animationFrameRef.current = null;
    });
  };

  return (
    <section className={css.budgetsList} aria-labelledby="budgets-heading">
      <div className={css.header}>
        <div>
          <p className={css.eyebrow}>Мої фінанси</p>
          <h2 id="budgets-heading">Бюджети</h2>
        </div>
        <span className={css.counter}>{budgets.length}</span>
      </div>

      <ul
        className={css.track}
        aria-label="Список бюджетів"
        onScroll={handleScroll}
      >
        {budgets.map((item) => {
          return (
            <BudgetCard
              key={item._id}
              item={item}
              isActive={item._id === selectedBudgetId}
            />
          );
        })}
        {showNewCard && <CreateBudgetCard />}
      </ul>
    </section>
  );
};

export default BudgetsList;
