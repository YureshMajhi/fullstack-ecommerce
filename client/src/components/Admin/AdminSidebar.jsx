import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const active = location.pathname;

  return (
    <>
      <div>
        <ul>
          <Link to={"/admin"}>
            <li className={`admin-li ${active === "/admin" && "menu-active"}`}>
              Dashboard
            </li>
          </Link>
          <Link to={"category"}>
            <li
              className={`admin-li ${
                active === "/admin/category" && "menu-active"
              } ${active === "/admin/category/add" && "menu-active"}`}
            >
              Category
            </li>
          </Link>
          <Link to={"product"}>
            <li
              className={`admin-li ${
                active === "/admin/product" ? "menu-active" : ""
              }`}
            >
              Products
            </li>
          </Link>
          <Link to={"user"}>
            <li
              className={`admin-li ${
                active === "/admin/user" ? "menu-active" : ""
              }`}
            >
              Users
            </li>
          </Link>
          <Link to={"order"}>
            <li
              className={`admin-li ${
                active === "/admin/order" ? "menu-active" : ""
              }`}
            >
              Orders
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;
