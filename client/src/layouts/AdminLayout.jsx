import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <div className="flex w-full max-w-[1500px] mx-auto mb-28">
        <div className="w-1/4 bg-[#084240] text-white text-xl rounded">
          <AdminSidebar />
        </div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
