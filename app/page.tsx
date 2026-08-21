import SignOutButton from "@/components/custom/SignOutButton/SignOutButton";
import css from "./Page.module.css";
import Link from "next/link";
import { BsCalendar2Day, BsCheck2Circle, BsHouseHeart } from "react-icons/bs";
import { FiArrowUpRight, FiChevronRight, FiClock } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
import { IoPersonCircleOutline } from "react-icons/io5";
import { GrTask } from "react-icons/gr";
import { PiRadioButton } from "react-icons/pi";
import Greetings from "@/components/custom/Greetings/Greetings";

const Page = () => {
  const navigationCards = [
    {
      href: "/budgets",
      label: "Budgets",
      description: "Track your money",
      icon: <GrMoney />,
      color: "blue",
    },
    {
      href: "/tasks",
      label: "Tasks",
      description: "Plan your day",
      icon: <GrTask />,
      color: "purple",
    },
    {
      href: "/schedule",
      label: "Calendar",
      description: "View your schedule",
      icon: <BsCalendar2Day />,
      color: "orange",
    },
    {
      href: "/profile",
      label: "Profile",
      description: "Personal details",
      icon: <IoPersonCircleOutline />,
      color: "green",
    },
    {
      href: "/shifts",
      label: "Shifts",
      description: "Tune your Friday",
      icon: <PiRadioButton />,
      color: "gray",
    },
    {
      href: "/habits",
      label: "Habits",
      description: "Tune your Friday",
      icon: <PiRadioButton />,
      color: "gray",
    },
  ];

  return (
    <div className={css.page}>
      <header className={css.header}>
        <div className={css.brand}>
          <span aria-hidden="true">
            <BsHouseHeart />
          </span>
          <div>
            <p>YOUR PERSONAL SPACE</p>
            <h1>Friday</h1>
          </div>
        </div>
        <button type="button" className={css.avatar} aria-label="Open profile">
          A
          <span aria-hidden="true" />
        </button>
      </header>

      <main>
        <section className={css.welcome}>
          <div>
            <span className={css.statusDot} aria-hidden="true" />
            <p>Everything looks good</p>
          </div>
          <Greetings />
          <p>Your plans, finances and daily focus are all in one place.</p>
        </section>

        <section className={css.navigationSection}>
          <div className={css.sectionTitle}>
            <div>
              <p>QUICK ACCESS</p>
              <h2>Your space</h2>
            </div>
            <span>3 actions</span>
          </div>

          <div className={css.navigationGrid}>
            {navigationCards.map((item, index) => (
              <Link
                className={css.navigationCard}
                href={item.href}
                key={item.href}
                style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}
              >
                <span
                  className={`${css.cardIcon} ${css[item.color]}`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                </div>
                <FiChevronRight className={css.chevron} aria-hidden="true" />
              </Link>
            ))}
            <SignOutButton />
          </div>
        </section>

        <section className={css.weekCard}>
          <div className={css.sectionTitle}>
            <div>
              <p>THIS WEEK</p>
              <h2>At a glance</h2>
            </div>
            <button type="button" aria-label="Open weekly overview">
              <FiArrowUpRight />
            </button>
          </div>

          <div className={css.metrics}>
            <div>
              <span className={css.metricIcon}>
                <GrMoney />
              </span>
              <strong>$1,336</strong>
              <p>Available</p>
            </div>
            <div>
              <span className={css.metricIcon}>
                <BsCheck2Circle />
              </span>
              <strong>8</strong>
              <p>Tasks done</p>
            </div>
            <div>
              <span className={css.metricIcon}>
                <FiClock />
              </span>
              <strong>4</strong>
              <p>Events left</p>
            </div>
          </div>
        </section>

        <section className={css.planCard}>
          <span className={css.planIcon} aria-hidden="true">
            <BsCalendar2Day />
          </span>
          <div>
            <p>NEXT UP</p>
            <h2>Weekly planning</h2>
            <span>Today, 6:30 PM · 30 min</span>
          </div>
          <Link href="/calendar" aria-label="Open calendar">
            <FiChevronRight />
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Page;
