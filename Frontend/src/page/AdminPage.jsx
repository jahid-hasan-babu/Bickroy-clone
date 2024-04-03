import React from "react";
import Footer from "../component/layout/Footer";
import AppNavbar from "../component/layout/AppNavbar";
import AdminLogin from "../component/admin/AdminLogin";

const AdminPage = () => {
  return (
    <>
      <AppNavbar />
      <AdminLogin />
      <Footer />
    </>
  );
};

export default AdminPage;
