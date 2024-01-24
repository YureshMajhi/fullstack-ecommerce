import React, { useState } from "react";
import { authenticate, isAuthentiated, login } from "../api/userApi";

// icons
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  // input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = isAuthentiated();

  // result
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setError("");
        setSuccess(true);

        authenticate(data);

        // clear the data
        setEmail("");
        setPassword("");
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

  // show successful message
  const redirect = () => {
    if (success) {
      if (user.role === "admin") {
        return navigate("/admin");
      }
      return navigate("/");
    }
  };

  return (
    <div className="max-w-[300px] md:max-w-md mx-auto">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Title */}
        <h1 className="text-2xl md:text-4xl my-4 md:my-8 text-[#084240] text-center">
          Login
        </h1>

        {/* signin result */}
        {showError()}
        {redirect()}

        {/* Input Feilds */}

        <input
          type="email"
          className="border-[#7c8d87] border-[1px] p-3"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="border-[#7c8d87] border-[1px] p-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Link
          to="/forgotpassword"
          className="underline text-[#084240] font-light hover:font-bold"
        >
          Forgot your password?
        </Link>

        <div className="flex flex-col justify-center items-center gap-5">
          <button className="bg-[#084240] text-white p-3 rounded w-[125px]">
            Sign In
          </button>
          <Link
            to="/signup"
            className="underline text-[#084240] font-light hover:font-bold"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
