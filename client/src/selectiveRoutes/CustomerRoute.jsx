import React from "react";
import { isAuthentiated } from "../api/userApi";
import { Navigate, Outlet } from "react-router-dom";

const CustomerRoute = () => {
  const { user } = isAuthentiated();
  return (
    <>
      {user && user.role === "customer" ? (
        <Outlet />
      ) : (
        <Navigate to={"/signin"} />
      )}
    </>
  );
};

export default CustomerRoute;
