// Header.js
import React from "react";
import { FiMenu, FiChevronLeft } from "react-icons/fi";

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center py-4 px-6">
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
      )}
      <h1 className="text-lg font-semibold">Dashboard</h1>
      {isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <FiChevronLeft size={24} />
        </button>
      )}
    </header>
  );
};

export default Header;
