import React from "react";
import AppNavbar from "../component/layout/AppNavbar";
import Footer from "../component/layout/Footer";
import Slider from "../component/adds/Slider";
import Categories from "../component/adds/Categories";
import QuickLinks from "../component/adds/QuickLinks";
import Adds from "../component/adds/Adds";
import SearchInput from "../component/layout/SearchInput";

const HomePage = () => {
  return (
    <>
      <AppNavbar />
      <SearchInput />
      <Slider />
      <Adds />
      <Categories />
      <QuickLinks />
      <Footer />
    </>
  );
};

export default HomePage;
