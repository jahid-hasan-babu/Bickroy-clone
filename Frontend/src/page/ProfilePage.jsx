import React from "react";
import AppNavbar from "./../component/layout/AppNavbar";
import MyAccount from "../component/user/MyAccount";
import Footer from "../component/layout/Footer";

const ProfilePage = () => {
  return (
    <>
      <AppNavbar />
      <MyAccount />
      <Footer />
    </>
  );
};

export default ProfilePage;
