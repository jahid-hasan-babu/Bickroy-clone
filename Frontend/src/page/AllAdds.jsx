import React from "react";
import AppNavbar from "./../component/layout/AppNavbar";
import Footer from "./../component/layout/Footer";
import Adds from "../component/adds/Adds";
import SearchInput from "./../component/layout/SearchInput";

const AllAdds = () => {
  return (
    <>
      <AppNavbar />
      <SearchInput />
      <Adds />
      <Footer />
    </>
  );
};

export default AllAdds;
