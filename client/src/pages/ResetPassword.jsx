import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api/userApi";
import { MdError } from "react-icons/md";
import { FaGrinStars } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password donot match");
    }

    resetPassword(password, token).then((data) => {
      if (data.error) {
        setSuccess("");
        setError(data.error);
      } else {
        setSuccess(data.msg);
        setError("");

        setPassword("");
        setConfirmPassword("");
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
    <>
      {" "}
      <div className="max-w-[300px] md:max-w-md mx-auto">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Title */}
          <h1 className="text-2xl md:text-4xl my-4 md:my-8 text-[#084240] text-center">
            Reset account password
            <span className="text-lg block mt-4 text-gray-500">
              Enter a new password
            </span>
          </h1>

          {/* signin result */}
          {showError()}
          {showSuccess()}

          {/* Input Feilds */}
          <input
            type="password"
            className="border-[#7c8d87] border-[1px] p-3"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <input
            type="password"
            className="border-[#7c8d87] border-[1px] p-3"
            placeholder="Confirm Password"
            name="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />

          <div className="flex flex-col justify-center items-center gap-5">
            <button className="bg-[#084240] text-white p-3 border-2 hover:border-[#084240] rounded whitespace-nowrap">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
