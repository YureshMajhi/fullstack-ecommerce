import React, { useState } from "react";
import { prices } from "./prices";

const PriceRadio = ({ handlePrice }) => {
  const [price, setPrice] = useState([]);

  const handleChange = (e) => {
    const selected = e.target.value;
    const searchPrice = prices.find((value) => value.id == selected);
    const value = searchPrice.value;
    setPrice(value);

    handlePrice(value, "price");
  };
  return (
    <>
      <select
        defaultValue={0}
        onChange={handleChange}
        className="text-right bg-transparent cursor-pointer text-gray-700"
      >
        {prices.map((price) => {
          return (
            <option key={price.id} value={price.id}>
              {price.title}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default PriceRadio;
