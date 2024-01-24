import React from "react";
import { isAuthentiated } from "../api/userApi";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user } = isAuthentiated();
  return (
    <>
      {user && user.role === "admin" ? <Outlet /> : <Navigate to={"/signin"} />}
    </>
  );
};

export default AdminRoute;
