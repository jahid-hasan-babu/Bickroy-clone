import React from "react";
import AppNavbar from "../component/layout/AppNavbar";
import Footer from "../component/layout/Footer";
import DetailsAdd from "../component/adds/DetailsAdd";

const DetailsPage = () => {
  return (
    <div>
      <AppNavbar />
      <DetailsAdd />
      <Footer />
    </div>
  );
};

export default DetailsPage;
