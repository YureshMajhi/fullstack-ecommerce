import React, { useState } from "react";
import { addCategory } from "../../../api/categoryApi";
import { isAuthentiated } from "../../../api/userApi";
import { MdError } from "react-icons/md";
import { FaGrinStars } from "react-icons/fa";

const AddCategory = () => {
  const user = isAuthentiated();

  // result
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [category, setCategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    addCategory(category, user.token).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setError("");
        setSuccess(true);
        setCategory("");
      }
    });
  };

  // show error messsage
  const showError = () => {
    if (error) {
      return (
        <div className="flex items-center gap-3">
          <MdError className="text-red-600 scale-150" />
          <p className="text-[#084240] underline">{error}</p>
        </div>
      );
    }
  };

  // show successful message
  const showSuccess = () => {
    if (success) {
      return (
        <div className="flex items-center gap-3">
          <FaGrinStars className="text-green-600 scale-150" />
          <p className="text-[#084240] underline">
            Category Added Successfully
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-center items-center gap-6"
      >
        <h2 className="text-4xl text-[#084240] mb-4">Add New Category</h2>

        {/*  result */}
        {showError()}
        {showSuccess()}

        <input
          type="text"
          placeholder="Enter New Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-[#7c8d87] border-[1px] p-3 w-[350px] mx-auto"
        />
        <button className="bg-[#084240] text-white p-3 rounded w-[105px] border-2 border-white hover:border-[#084240] mx-auto">
          Add
        </button>
      </form>
    </>
  );
};

export default AddCategory;
