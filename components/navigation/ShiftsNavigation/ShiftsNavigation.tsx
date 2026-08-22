"use client";
import css from "./ShiftsNavigation.module.css";

import { RiBankCardFill } from "react-icons/ri";
import { IoIosStats } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ShiftsNavigation = () => {
  const pathname = usePathname();
  return (
    <div className={css["shiftsStats"]}>
      <ul className={css.navigationList}>
        <li>
          <Link
            className={`${css.navItem} ${
              pathname === "/shifts" ? css.active : ""
            }`}
            href="/shifts"
            aria-label="Shifts"
            aria-current={pathname === "/shifts" ? "page" : undefined}
          >
            <RiBankCardFill aria-hidden="true" />
            <span>Shifts</span>
          </Link>
        </li>

        <li>
          <Link
            className={`${css.navItem} ${
              pathname === "/shifts/stats" ? css.active : ""
            }`}
            href="/shifts/stats"
            aria-label="Stats"
            aria-current={pathname === "/shifts/stats" ? "page" : undefined}
          >
            <IoIosStats aria-hidden="true" />
            <span>Statistics</span>
          </Link>
        </li>
        <li>
          <Link
            className={`${css.navItem} ${
              pathname === "/profile" ? css.active : ""
            }`}
            href="/profile"
            aria-label="Profile"
            aria-current={pathname === "/profile" ? "page" : undefined}
          >
            <IoPersonCircleOutline aria-hidden="true" />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ShiftsNavigation;
