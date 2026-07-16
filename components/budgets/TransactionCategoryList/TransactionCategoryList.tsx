import css from "./TransactionCategoryList.module.css";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiShoppingBasketLine } from "react-icons/ri";
import { FaGlassCheers } from "react-icons/fa";
import { TbHealthRecognition } from "react-icons/tb";
import { MdSportsMartialArts } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { FaHouseFire } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { IoMdAirplane } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { TbSquareRotatedForbid2 } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { AiOutlineGift } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiSellCard } from "react-icons/gi";
import { TbPigMoney } from "react-icons/tb";

interface Category {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  isDeposit?: boolean;
}

export const transactionCategories: Record<string, Category> = {
  "no-category": {
    title: "No category",
    value: "no-category",
    icon: <TbSquareRotatedForbid2 />,
    color: "white",
  },
  products: {
    title: "Products",
    value: "products",
    icon: <IoFastFoodOutline />,
    color: "orange",
  },
  shopping: {
    title: "Shopping",
    value: "shopping",
    icon: <RiShoppingBasketLine />,
    color: "red",
  },
  entertainment: {
    title: "Entertainment",
    value: "entertainment",
    icon: <FaGlassCheers />,
    color: "purple",
  },
  health: {
    title: "Health",
    value: "health",
    icon: <TbHealthRecognition />,
    color: "green",
  },
  sport: {
    title: "Sport",
    value: "sport",
    icon: <MdSportsMartialArts />,
    color: "blue",
  },
  transport: {
    title: "Transport",
    value: "transport",
    icon: <IoCarSport />,
    color: "black",
  },
  house: {
    title: "House",
    value: "house",
    icon: <FaHouseFire />,
    color: "yellow",
  },
  pets: {
    title: "Pets",
    value: "pet",
    icon: <MdPets />,
    color: "tomato",
  },
  travel: {
    title: "Travel",
    value: "travel",
    icon: <IoMdAirplane />,
    color: "pink",
  },
  education: {
    title: "Education",
    value: "education",
    icon: <IoBookSharp />,
    color: "teal",
  },
  "others-income": {
    title: "Others-income",
    value: "other-income",
    icon: <TbPigMoney />,
    color: "green",
    isDeposit: true,
  },
  salary: {
    title: "Salary",
    value: "salary",
    icon: <RiMoneyDollarCircleLine />,
    color: "green",
    isDeposit: true,
  },
  gift: {
    title: "Gift",
    value: "gift",
    icon: <AiOutlineGift />,
    color: "red",
    isDeposit: true,
  },
  "side-income": {
    title: "Side-income",
    value: "side-income",
    icon: <GiTakeMyMoney />,
    color: "orange",
    isDeposit: true,
  },
  "investment-income": {
    title: "Investment-income",
    value: "Investment-income",
    icon: <FcMoneyTransfer />,
    color: "blue",
    isDeposit: true,
  },
  sales: {
    title: "Sales",
    value: "Sales",
    icon: <GiSellCard />,
    color: "blue",
    isDeposit: true,
  },
};

export const categoryArray = Object.values(transactionCategories).filter(
  (item) => !item.isDeposit,
);
export const depositArray = Object.values(transactionCategories).filter(
  (item) => item.isDeposit,
);

interface TransactionCategoryListProps {
  isDeposit?: boolean;
}

const TransactionCategoryList = ({
  isDeposit,
}: TransactionCategoryListProps) => {
  const array = isDeposit ? depositArray : categoryArray;

  return (
    <fieldset className={css.transactionCategoryList}>
      <legend>Category</legend>
      <div className={css.track}>
        {array.map((item) => {
          return (
            <label
              className={css.category}
              data-color={item.color}
              key={item.value}
            >
              <input
                className={css.input}
                type="radio"
                name="category"
                value={item.value}
                defaultChecked={item.value === "no-category"}
              />
              <span className={css.button}>
                <span className={css.icon} aria-hidden="true">
                  {item.icon}
                </span>
                <span className={css.title}>{item.title}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default TransactionCategoryList;
