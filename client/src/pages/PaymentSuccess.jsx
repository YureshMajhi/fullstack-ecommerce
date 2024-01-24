import React, { useEffect, useState } from "react";
import { isAuthentiated } from "../api/userApi";
import { placeOrder } from "../api/orderApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../reducers/cartActions";

const PaymentSuccess = () => {
  const shipping_info = JSON.parse(localStorage.getItem("shipping_info"));
  const { user } = isAuthentiated();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let order = {
      orderItems: JSON.parse(localStorage.getItem("cart_items")),
      user: user._id,
      ...shipping_info,
    };
    placeOrder(order).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setError("");
        setSuccess(true);
        dispatch(emptyCart());
      }
    });
  }, []);

  const showError = () => {
    if (error) {
      return (
        <div className="py-5 text-red-600 text-center text-2xl">{error}</div>
      );
    }
  };

  const showSuccess = () => {
    if (success) {
      return (
        <div className="py-5 text-green-600 text-center text-2xl">
          Order placed successfully
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-4 py-8">
        {showError()}
        {showSuccess()}

        <Link to="/" className="text-green-400 hover:text-green-600">
          {"<"} Return to Home Page
        </Link>
      </div>
    </>
  );
};

export default PaymentSuccess;
