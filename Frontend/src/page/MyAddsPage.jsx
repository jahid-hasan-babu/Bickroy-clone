import React from "react";
import MyAdds from "../component/user/MyAdds";
import Footer from "../component/layout/Footer";
import AppNavbar from "../component/layout/AppNavbar";

const MyAddsPage = () => {
  return (
    <>
      <AppNavbar />
      <MyAdds />
      <Footer />
    </>
  );
};

export default MyAddsPage;
