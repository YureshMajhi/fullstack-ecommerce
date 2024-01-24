import React, { useEffect, useState } from "react";

// Icons
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { FaHouseUser } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";

import "../App.css";
import Sidebar from "./Sidebar";
import Info from "./Info";
import { Link, useNavigate } from "react-router-dom";
import { isAuthentiated, logout } from "../api/userApi";
import { ToastContainer, toast } from "react-toastify";

import { useSelector } from "react-redux";

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const handleClick = () => {
    setNav(!nav);
  };

  const { user } = isAuthentiated();

  const [menuClick, setMenuClick] = useState("");
  const handleMenuClick = (menuItem) => {
    switch (menuItem) {
      case "":
        setMenuClick("");
        break;

      case "newIn":
        setMenuClick("newIn");
        break;
      case "bestsellers":
        setMenuClick("bestsellers");
        break;
      case "about":
        setMenuClick("about");
        break;
      case "pricing":
        setMenuClick("pricing");
        break;
      case "shopAll":
        setMenuClick("shopAll");
        break;
    }
  };

  // Set title size
  const [bigFont, setBigFont] = useState(false);
  useEffect(() => {
    // Setting title size for small screen
    if (window.innerWidth < 640) {
      setBigFont(false);
      return;
    } else {
      setBigFont(true);
    }

    // Setting title size for big screen on scroll
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Heading size animation
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setBigFont(false);
    } else {
      setBigFont(true);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    logout().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.msg);
        navigate("/");
      }
    });
  };

  let cartCount = useSelector((state) => state.cart.cart_items.length);

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <Info />
      <div className="sticky top-0 z-50 bg-white">
        <div className="flex justify-between max-w-[1400px] mx-auto pl-16 pr-4 py-8 ">
          <div className="flex items-center relative">
            {/* Title */}
            <div className="mr-14 text-[#084240]">
              <h1
                className={`font-[Stylish] duration-300 ${
                  bigFont ? "text-5xl" : "text-4xl"
                }`}
              >
                <Link onClick={() => handleMenuClick("")} to="/">
                  Yurush
                </Link>
              </h1>
              <p
                className={` ${
                  bigFont ? "text-[.8rem]" : "text-[.6rem]"
                }  duration-300 text-center font-medium text-gray-700`}
              >
                Formerly Alice + Whittles
              </p>
            </div>

            {/* Menu */}
            <ul className="hidden lg:flex font-light text-sm text-gray-700">
              <li
                className={`p-4 tracking-wide hover:underline hover:text-black hover:font-normal ${
                  menuClick == "newIn" ? "font-normal text-black underline" : ""
                }`}
              >
                <Link onClick={() => handleMenuClick("newIn")} to="/newIn">
                  New In
                </Link>
              </li>
              <li
                className={`p-4 tracking-wide hover:underline hover:text-black hover:font-normal ${
                  menuClick == "bestsellers"
                    ? "font-normal text-black underline"
                    : ""
                }`}
              >
                <Link
                  onClick={() => handleMenuClick("bestsellers")}
                  to="bestsellers"
                >
                  Bestsellers
                </Link>
              </li>
              <li
                className={`p-4 tracking-wide hover:underline hover:text-black hover:font-normal ${
                  menuClick == "pricing"
                    ? "font-normal text-black underline"
                    : ""
                }`}
              >
                <Link onClick={() => handleMenuClick("pricing")} to="pricing">
                  Pricing
                </Link>
              </li>
              <li
                className={`p-4 tracking-wide hover:underline hover:text-black hover:font-normal ${
                  menuClick == "shopAll"
                    ? "font-normal text-black underline"
                    : ""
                }`}
              >
                <Link onClick={() => handleMenuClick("shopAll")} to="shopAll">
                  Shop All
                </Link>
              </li>
              <li
                className={`p-4 tracking-wide hover:underline hover:text-black hover:font-normal ${
                  menuClick == "about" ? "font-normal text-black underline" : ""
                }`}
              >
                <Link onClick={() => handleMenuClick("about")} to="about">
                  About
                </Link>
              </li>
            </ul>

            {/* Hamburger */}
            <div
              className="lg:hidden absolute top-[10px] left-[-40px] text-2xl"
              onClick={handleClick}
            >
              {nav ? <RxHamburgerMenu /> : <RxCross2 />}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center text-[1.3rem]">
            <button className="m-3 hover:scale-125">
              <AiOutlineSearch />
            </button>
            <button className="m-3 hover:scale-125">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link to="admin">
                      <GrUserAdmin />
                    </Link>
                  )}
                  {user.role === "customer" && (
                    <Link to="userprofile">
                      <FaHouseUser />
                    </Link>
                  )}
                </>
              ) : (
                <Link to="signin">
                  <VscAccount />
                </Link>
              )}
            </button>

            <button className="m-3 hover:scale-125">
              {user ? (
                <>
                  {user.role === "admin" ? (
                    <IoLogOut onClick={handleLogout} />
                  ) : (
                    <Link to="cart" className="relative">
                      <AiOutlineShoppingCart />
                      {cartCount > 0 && (
                        <span className="absolute scale-75 flex items-center text-xs rounded-full top-1 -right-7 bg-[#084240] w-6 h-6 justify-center text-white">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  )}
                </>
              ) : (
                <Link to="cart" className="relative">
                  <AiOutlineShoppingCart />
                  {cartCount > 0 && (
                    <span className="absolute scale-75 flex items-center text-xs rounded-full top-1 -right-7 bg-[#084240] w-6 h-6 justify-center text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* SideBar */}
      <Sidebar nav={nav} handleClick={handleClick} />
    </>
  );
};

export default Navbar;
