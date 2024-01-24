import React, { useEffect, useState } from "react";
import { isAuthentiated } from "../../../api/userApi";
import { MdError } from "react-icons/md";
import { FaGrinStars } from "react-icons/fa";
import { getCategoryDetail, updateCategory } from "../../../api/categoryApi";
import { useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { token } = isAuthentiated();
  const { id } = useParams();

  // result
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [category, setCategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    updateCategory(id, category, token).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  useEffect(() => {
    getCategoryDetail(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategory(data.title);
      }
    });
  }, []);

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
            Category Updated Successfully
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
        <h2 className="text-4xl text-[#084240] mb-4">Update Category</h2>

        {/*  result */}
        {showError()}
        {showSuccess()}

        <input
          type="text"
          placeholder="New Category Name"
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

export default UpdateCategory;
