import React from "react";
import AppNavbar from "../component/layout/AppNavbar";
import AdminLogin from "../component/admin/AdminLogin";
import Footer from "../component/layout/Footer";

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
