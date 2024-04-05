import React from "react";
import MyAccount from "../component/user/MyAccount";
import AppNavbar from "../component/layout/AppNavbar";
import Footer from "../component/layout/Footer";

const SettingsPage = () => {
  return (
    <>
      <AppNavbar />
      <MyAccount />
      <Footer />
    </>
  );
};

export default SettingsPage;
