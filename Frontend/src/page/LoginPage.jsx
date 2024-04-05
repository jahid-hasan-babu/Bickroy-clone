import React from "react";
import AppNavbar from "./../component/layout/AppNavbar";
import Footer from "./../component/layout/Footer";
import Login from "../component/user/LoginFrom";

const LoginPage = () => {
  return (
    <>
      <AppNavbar />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
