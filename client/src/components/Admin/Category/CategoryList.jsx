import React from "react";
import { Link } from "react-router-dom";

const CategoryList = ({ i, category, handleDelete }) => {
  return (
    <>
      <tr className="hover:bg-gray-200">
        <td className="text-xl text-gray-700">{i + 1}</td>
        <td className="text-xl text-gray-700">{category.title}</td>
        <td className="w-36 p-2">
          <div className="flex flex-col gap-2 text-white">
            <Link
              to={`update/${category._id}`}
              className="bg-yellow-500 hover:bg-yellow-300 p-2 rounded-md"
            >
              <button>Update</button>
            </Link>
            <button
              onClick={() => handleDelete(category._id)}
              className="bg-red-500 hover:bg-red-300 p-2 rounded-md"
            >
              Remove
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CategoryList;
