import React from "react";
import AppNavbar from "../component/layout/AppNavbar";
import Footer from "../component/layout/Footer";
import CreateAdd from "../component/user/CreateAdd";

const CreateAddPage = () => {
  return (
    <>
      <AppNavbar />
      <CreateAdd />
      <Footer />
    </>
  );
};

export default CreateAddPage;
