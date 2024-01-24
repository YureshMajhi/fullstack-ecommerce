import React, { useEffect, useState } from "react";
import { getAllCategories } from "../api/categoryApi";

const CategorySelect = ({ handleCategory }) => {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

  const handleChange = (e) => {
    handleCategory(e.target.value, "category");
  };

  return (
    <>
      <select
        defaultValue={""}
        onChange={handleChange}
        className="text-right bg-transparent cursor-pointer text-gray-700"
      >
        <option value="">Show All</option>
        {categories.map((category) => {
          return (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default CategorySelect;
