import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../api/userApi";

const EmailVerification = () => {
  const params = useParams();
  const token = params.token;

  // result
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    verifyEmail(token)
      .then((data) => {
        if (data.error) {
          setSuccess("");
          setError(data.error);
        } else {
          setSuccess(data.msg);
          setError("");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const showError = () => {
    if (error) {
      return (
        <div className="bg-red-200 text-red-600 text-center py-2 text-xl">
          {error}
        </div>
      );
    }
  };

  const showSuccess = () => {
    if (success) {
      return (
        <div className="bg-green-200 text-green-600 text-center py-2 text-xl">
          {success}
        </div>
      );
    }
  };

  return (
    <div>
      {showError()}
      {showSuccess()}
    </div>
  );
};

export default EmailVerification;
