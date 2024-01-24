import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import CallToAction from "./CallToAction";
import { isAuthentiated } from "../api/userApi";

const Layouts = () => {
  const { user } = isAuthentiated();
  return (
    <>
      <Navbar />
      <Outlet />

      {!user && <CallToAction />}
      <Footer />
    </>
  );
};

export default Layouts;
