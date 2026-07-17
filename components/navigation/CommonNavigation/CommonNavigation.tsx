"use client";

import css from "./CommonNavigation.module.css";
import { useModal } from "@/hooks/useModal";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbSettingsCog } from "react-icons/tb";
import { BsCalendar2Day } from "react-icons/bs";
import { GrTask } from "react-icons/gr";
import { GrMoney } from "react-icons/gr";
import { BsHouseHeart } from "react-icons/bs";

const CommonNavigation = () => {
  const [isOpenModal, , hideModal, toggle] = useModal();

  const navigationItems = [
    {
      href: "/budgets",
      label: "Budgets",
      icon: <GrMoney aria-hidden="true" />,
    },
    {
      href: "/tasks",
      label: "Tasks",
      icon: <GrTask aria-hidden="true" />,
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: <BsCalendar2Day aria-hidden="true" />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <TbSettingsCog aria-hidden="true" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <IoPersonCircleOutline aria-hidden="true" />,
    },
    {
      href: "/auth/login",
      label: "Sign out",
      icon: <MdLogout aria-hidden="true" />,
    },
  ];

  return (
    <div className={css.commonNavigation}>
      {isOpenModal && (
        <ul className={css.menu}>
          {navigationItems.map((item, index) => (
            <li
              key={item.href}
              style={{ "--item-index": index } as React.CSSProperties}
            >
              <Link
                href={item.href}
                onClick={hideModal}
                aria-label={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <button
        className={`${css.trigger} ${isOpenModal ? css.open : ""}`}
        type="button"
        onClick={toggle}
        aria-label={isOpenModal ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpenModal}
      >
        <BsHouseHeart aria-hidden="true" />
      </button>
    </div>
  );
};

export default CommonNavigation;
