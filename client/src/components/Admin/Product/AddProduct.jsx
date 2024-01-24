import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../../api/categoryApi";
import { addProduct } from "../../../api/productapi";
import { isAuthentiated } from "../../../api/userApi";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const { token } = isAuthentiated();

  const [product, setProduct] = useState({
    formData: new FormData(),
  });

  const { formData } = product;
  const handleChange = (e) => {
    if (e.target.name == "image") {
      formData.set(e.target.name, e.target.files[0]);
    } else {
      formData.set(e.target.name, e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addProduct(token, formData).then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Product added successfully");
      }
    });
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-6 p-4 bg-[#08424038] max-w-lg ml-6 rounded-lg border-2 border-[#084240]"
      >
        <h2 className="text-4xl text-[#084240] mb-4 underline">
          Add New Product
        </h2>

        <div className="w-full">
          <label className="text-[#084240] font-bold text-lg" htmlFor="title">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter New Product"
            id="title"
            name="title"
            onChange={handleChange}
            className="p-2 rounded w-full"
          />
        </div>

        <div className="w-full">
          <label className="text-[#084240] font-bold text-lg" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            placeholder="Enter Price"
            id="price"
            name="price"
            onChange={handleChange}
            className="p-2 rounded w-full"
          />
        </div>

        <div className="w-full">
          <label
            className="text-[#084240] font-bold text-lg"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            placeholder="Describe your product"
            id="description"
            rows={4}
            name="description"
            onChange={handleChange}
            className="p-2 rounded w-full resize-none"
          ></textarea>
        </div>

        <div className="w-full">
          <label
            className="text-[#084240] font-bold text-lg"
            htmlFor="count_in_stock"
          >
            Count in Stock
          </label>
          <input
            type="number"
            placeholder="Stock"
            id="count_in_stock"
            name="count_in_stock"
            onChange={handleChange}
            className="p-2 rounded w-full"
          />
        </div>

        <div className="w-full">
          <label className="text-[#084240] font-bold text-lg" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            placeholder="Image"
            id="image"
            name="image"
            onChange={handleChange}
            className="p-2 rounded w-full"
          />
        </div>

        <div className="w-full">
          <label
            className="text-[#084240] font-bold text-lg"
            htmlFor="category"
          >
            Select Category
          </label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            className="p-2 rounded w-full"
          >
            <option value="" selected disabled>
              Choose a Category
            </option>
            {/* Category list from api */}
            {categories &&
              categories.map((category, i) => (
                <option key={i} value={category._id}>
                  {category.title}
                </option>
              ))}
          </select>
        </div>
        <button className="bg-[#084240] text-white p-3 rounded w-full border-2 border-[#08424000] mx-auto">
          Add
        </button>
      </form>
    </>
  );
};

export default AddProduct;
