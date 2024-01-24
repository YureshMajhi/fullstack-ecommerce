import React, { useState } from "react";

// icons
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaGrinStars } from "react-icons/fa";
import { forgotPassword } from "../api/userApi";

const ForgetPassword = () => {
  // input values
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    forgotPassword(email).then((data) => {
      if (data.error) {
        setSuccess("");
        setError(data.error);
      } else {
        setSuccess(data.msg);
        setError("");

        setEmail("");
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

  const showSuccess = () => {
    if (success) {
      return (
        <div className="flex items-center gap-3">
          <FaGrinStars className="text-green-600 scale-150" />
          <p className="text-[#084240] underline">{success}</p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-[300px] md:max-w-md mx-auto">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Title */}
        <h1 className="text-2xl md:text-4xl my-4 md:my-8 text-[#084240] text-center">
          Reset your password
          <span className="text-lg block mt-4 text-gray-500">
            We will send you an email to reset your password
          </span>
        </h1>

        {/* signin result */}
        {showError()}
        {showSuccess()}

        {/* Input Feilds */}
        <input
          type="email"
          className="border-[#7c8d87] border-[1px] p-3"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="flex flex-col justify-center items-center gap-5">
          <button className="bg-[#084240] text-white p-3 rounded w-[125px]">
            Submit
          </button>
          <Link
            to="/signin"
            className="underline text-[#084240] font-light hover:font-bold"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
