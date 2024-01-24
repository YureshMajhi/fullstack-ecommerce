import React from "react";
import { Link } from "react-router-dom";

const Checkout = ({ calculateSubtotal }) => {
  return (
    <>
      <div className="md:flex justify-between">
        <div>
          <p className="text-gray-700 my-2">Order special instructions</p>
          <textarea
            name="instructions"
            id="instructions"
            cols="30"
            rows="5"
            className="border-[1px] border-black w-full"
          ></textarea>
        </div>
        <div>
          <p className="text-center my-2 text-xl text-[#084240]">
            Subtotal{" "}
            <span className="text-gray-700 ml-4">
              Rs. {calculateSubtotal()} NPR
            </span>
          </p>
          <p className="text-center text-gray-700 my-2 text-sm">
            Taxes and shipping calculated at checkout
          </p>
          <div className="flex justify-center">
            <Link
              to="/checkout"
              className="bg-[#084240] w-full max-w-sm text-white py-3 rounded-md text-center"
            >
              Check out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
