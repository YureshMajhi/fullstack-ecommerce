import React, { useState } from "react";
import { register } from "../api/userApi";

// icons
import { MdError } from "react-icons/md";

const SignUp = () => {
  // input values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // result
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    register(email, username, password).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setError("");
        setSuccess(true);

        // clear the data
        setUsername("");
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
  const showSuccess = () => {
    if (success) {
      return (
        <div className="bg-green-200 text-center text-xl py-2 text-green-600">
          <p>
            User Registered successfully.
            <span className="block">Please verify your email to continue</span>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-[300px] md:max-w-md mx-auto">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Title */}
        <h1 className="text-2xl md:text-4xl my-4 md:my-8 text-[#084240] text-center">
          Create Account
        </h1>

        {/* signin result */}
        {showError()}
        {showSuccess()}

        {/* Input Feilds */}
        <input
          type="text"
          className="border-[#7c8d87] border-[1px] p-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="email"
          className="border-[#7c8d87] border-[1px] p-3"
          placeholder="Email"
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
        <button className="bg-[#084240] text-white p-3 rounded max-w-[125px] relative left-1/2 -translate-x-1/2">
          Create
        </button>
      </form>
    </div>
  );
};

export default SignUp;
