import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AdminStore from "../../store/AdminStore";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLogin } = AdminStore();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!isLogin()) {
      navigate("/admin-login");
    }
  }, [isLogin, navigate]);

  return (
    <div>
      {isLogin() ? (
        <>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex flex-col flex-grow">
            <Header toggleSidebar={toggleSidebar} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DashBoard;
