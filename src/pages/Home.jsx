import React from "react";
import Carousal from "../Component/Carousal";
import Movielist from "../Component/Movielist";
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
