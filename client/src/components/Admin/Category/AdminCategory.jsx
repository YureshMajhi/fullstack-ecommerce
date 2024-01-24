import React, { useEffect, useState } from "react";
import { deleteCategory, getAllCategories } from "../../../api/categoryApi";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CategoryList from "./CategoryList";

const AdminCategory = () => {
  const [change, handleChange] = useState(true);

  // display all category
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  }, [change]);

  // delete category
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Category",
      text: "Are you sure you want to delete this category?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id).then((data) => {
          if (data.error) {
            Swal.fire({
              title: data.error,
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
              position: "top-right",
            });
          } else {
            Swal.fire({
              title: "Category Deleted Successfully",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
              position: "top-right",
            });
            handleChange(!change);
          }
        });
      }
    });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        {/* Title */}
        <div className="flex justify-between my-4">
          <h2 className="text-4xl text-[#084240]">Categories</h2>
          <Link to={"/admin/category/add"}>
            <button className="bg-[#084240] text-white p-3 rounded text-sm border-2 border-white hover:border-[#084240]">
              Add New Category
            </button>
          </Link>
        </div>

        {/* Display Categories table */}
        <table className="w-full">
          <thead className="bg-gray-200 text-white text-lg">
            <tr>
              <th>S.No.</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categories &&
              categories.map((category, i) => {
                return (
                  <CategoryList
                    key={i}
                    i={i}
                    category={category}
                    handleDelete={handleDelete}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminCategory;
