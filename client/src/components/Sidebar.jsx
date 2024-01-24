import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ nav, handleClick }) => {
  return (
    <>
      <div
        onClick={handleClick}
        className={
          nav
            ? "hidden"
            : "flex bg-gray-400 opacity-50 fixed right-0 left-0 bottom-0 top-0 z-40"
        }
      >
        {/* Mobile Menu */}
      </div>
      <ul
        className={`w-[300px] flex flex-col duration-300 md:w-[400px] fixed top-0 pt-[200px] bottom-0 text-xl bg-white z-40 text-gray-700
          ${nav ? "translate-x-[-100%] duration-300" : "translate-x-0"}`}
      >
        <Link to="/newIn">
          <li
            onClick={handleClick}
            className="py-4 pl-6 my-1 hover:bg-gray-200 hover:underline hover:font-semibold"
          >
            New In
          </li>
        </Link>
        <Link to="bestsellers">
          {" "}
          <li
            onClick={handleClick}
            className="py-4 pl-6 my-1 hover:bg-gray-200 hover:underline hover:font-semibold"
          >
            Bestsellers
          </li>
        </Link>
        <Link to="pricing">
          <li
            onClick={handleClick}
            className="py-4 pl-6 my-1 hover:bg-gray-200 hover:underline hover:font-semibold"
          >
            Pricing
          </li>
        </Link>
        <Link to="shopAll">
          <li
            onClick={handleClick}
            className="py-4 pl-6 my-1 hover:bg-gray-200 hover:underline hover:font-semibold"
          >
            Shop All
          </li>
        </Link>
        <Link to="about">
          <li
            onClick={handleClick}
            className="py-4 pl-6 my-1 hover:bg-gray-200 hover:underline hover:font-semibold"
          >
            About
          </li>
        </Link>
      </ul>
    </>
  );
};

export default Sidebar;
