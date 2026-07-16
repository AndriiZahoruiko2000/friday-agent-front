"use client";

import { currencyList } from "@/helpers/constants";
import css from "./CurrencySelector.module.css";
import { useState } from "react";
import { IoCashOutline, IoChevronDown } from "react-icons/io5";

const CurrencySelector = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);

  return (
    <label className={css.currencySelector}>
      <span className={css.icon} aria-hidden="true">
        <IoCashOutline />
      </span>
      <span className={css.text}>
        <small>Currency</small>
        <strong>{selectedCurrency.toUpperCase()}</strong>
      </span>
      <IoChevronDown className={css.chevron} aria-hidden="true" />
      <select
        className={css.select}
        name="currency"
        value={selectedCurrency}
        onChange={(event) => setSelectedCurrency(event.target.value)}
        aria-label="Currency"
        required
      >
        {currencyList.map((item) => {
          return (
            <option value={item.toUpperCase()} key={item}>
              {item.toUpperCase()}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default CurrencySelector;
