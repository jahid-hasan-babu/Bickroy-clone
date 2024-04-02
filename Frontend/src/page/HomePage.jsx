import React from "react";
import AppNavbar from "../component/layout/AppNavbar";
import Footer from "../component/layout/Footer";
import Slider from "../component/adds/Slider";
import Categories from "../component/adds/Categories";
import QuickLinks from "../component/adds/QuickLinks";

const HomePage = () => {
  return (
    <>
      <AppNavbar />
      <Slider />
      <Categories />
      <QuickLinks />
      <Footer />
    </>
  );
};

export default HomePage;
