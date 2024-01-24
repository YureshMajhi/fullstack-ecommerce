import React, { useEffect, useState } from "react";
import newIn from "../assets/Images/New In.png";
import Card from "../components/Card";
import useProductAPI from "../utils/useProductAPI";
import useCart from "../utils/useCart";
import { ToastContainer, toast } from "react-toastify";

const NewIn = () => {
  const products = useProductAPI();

  const { localProduct, addToCart } = useCart();

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />

      <div>
        {/* Image Section */}
        <div className="relative">
          <img
            src={newIn}
            alt="New In Image"
            className="h-[20vh] md:h-[30vh] lg:h-[40vh] w-full max-w-[1500px] mx-auto object-cover object-top"
          />
          <h2 className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 text-[#284057] font-semibold text-xl lg:text-4xl md:text-3xl">
            New This Month
          </h2>
        </div>

        {/* Products Section */}
        <div className="flex justify-center my-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-6">
            {products &&
              products.slice(5, 12).map((product) => {
                return (
                  <Card item={product} key={product.id} addToCart={addToCart} />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewIn;
