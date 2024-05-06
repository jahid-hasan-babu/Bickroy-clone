import React from "react";
import AppNavbar from "../component/layout/AppNavbar";
import Footer from "../component/layout/Footer";
import NotFound from "../component/layout/NotFound";

const ErrorPage = () => {
  return (
    <>
      <AppNavbar />
      <NotFound />
      <Footer />
    </>
  );
};

export default ErrorPage;
