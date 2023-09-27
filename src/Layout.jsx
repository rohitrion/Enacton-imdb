import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";

export const Layout = ({ children, isShow }) => {
  return (
    <div>
      {isShow && <Navbar />}
      {children}
      <Footer />
    </div>
  );
};
