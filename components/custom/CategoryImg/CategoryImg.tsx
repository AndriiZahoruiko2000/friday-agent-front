import { transactionCategories } from "@/components/budgets/TransactionCategoryList/TransactionCategoryList";
import css from "./CategoryImg.module.css";

interface CategoryImgProps {
  category: string;
}

const CategoryImg = ({ category }: CategoryImgProps) => {
  const categoryItem = transactionCategories[category];

  return categoryItem.icon;
};

export default CategoryImg;
