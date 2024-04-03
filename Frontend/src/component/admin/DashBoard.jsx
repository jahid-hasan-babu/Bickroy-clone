import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-grow">
        <Header toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default DashBoard;
