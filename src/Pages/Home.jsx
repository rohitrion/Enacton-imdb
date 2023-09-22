import React from "react";
import Carousal from "../Component/Carousal";
import Footer from "../Component/Footer";
import Movielist from "../Component/Movielist";
import Navbar from "../Component/Navbar";
import Toprated from "../Component/Toprated";

const Home = () => {
  return (
    <>
      <Carousal />
      <Movielist />
      <Toprated />
    </>
  );
};

export default Home;
