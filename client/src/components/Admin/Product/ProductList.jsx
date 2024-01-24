import React from "react";
import { API } from "../../../config";
import { Link } from "react-router-dom";

const ProductList = ({ product, i, handleDelete }) => {
  return (
    <>
      <tr key={i} className="hover:bg-gray-200">
        <td className="text-xl text-gray-700">{i + 1}</td>
        <td>
          <img
            className="h-28 max-w-sm mx-auto p-2"
            src={`${API}/${product.image}`}
            alt={product.title}
          />
        </td>
        <td className="text-xl text-gray-700">{product.title}</td>
        <td className="text-xl text-gray-700">{product.price}</td>
        <td className="text-xl text-gray-700">{product.count_in_stock}</td>
        <td className="text-xl text-gray-700">{product.category?.title}</td>

        <td className="w-36 p-2">
          <div className="flex flex-col gap-2 text-white">
            <Link
              to={`update/${product._id}`}
              className="bg-yellow-500 hover:bg-yellow-300 p-2 rounded-md"
            >
              <button>Update</button>
            </Link>
            <button
              onClick={() => handleDelete(product._id)}
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

export default ProductList;
