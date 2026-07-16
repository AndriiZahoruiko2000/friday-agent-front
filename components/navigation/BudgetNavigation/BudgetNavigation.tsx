"use client";
import Link from "next/link";
import css from "./BudgetNavigation.module.css";
import { MdAdd } from "react-icons/md";
import { RiBankCardFill } from "react-icons/ri";
import { IoIosStats } from "react-icons/io";
import { useTransactionModal } from "@/hooks/useTransactionModal";
import { usePathname } from "next/navigation";

const BudgetNavigation = () => {
  const [, showModal] = useTransactionModal();
  const pathname = usePathname();

  return (
    <ul className={css.navigationList}>
      <li>
        <Link
          className={`${css.navItem} ${
            pathname === "/budgets" ? css.active : ""
          }`}
          href="/budgets"
          aria-label="Budgets"
          aria-current={pathname === "/budgets" ? "page" : undefined}
        >
          <RiBankCardFill aria-hidden="true" />
          <span>Budgets</span>
        </Link>
      </li>
      <li className={css.createItem}>
        <button
          className={css.createButton}
          type="button"
          onClick={showModal}
          aria-label="Add transaction"
        >
          <MdAdd aria-hidden="true" />
        </button>
      </li>
      <li>
        <Link
          className={`${css.navItem} ${
            pathname === "/budgets/statistics" ? css.active : ""
          }`}
          href="/budgets/statistics"
          aria-label="Statistics"
          aria-current={
            pathname === "/budgets/statistics" ? "page" : undefined
          }
        >
          <IoIosStats aria-hidden="true" />
          <span>Statistics</span>
        </Link>
      </li>
    </ul>
  );
};

export default BudgetNavigation;
