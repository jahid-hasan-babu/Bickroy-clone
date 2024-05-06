// Sidebar.js
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 py-4 px-6 transition-all duration-300 z-10 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <img className="w-[30%]" src={logo} alt="image" />
        {isOpen ? (
          <button
            onClick={toggleSidebar}
            className="text-gray-300 focus:outline-none"
          >
            <FiChevronLeft />
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="text-gray-300 focus:outline-none"
          >
            <FiChevronRight />
          </button>
        )}
      </div>
      <ul>
        <li>
          <Link
            to="/admin-dashboard/adds"
            className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Adds
          </Link>
        </li>
        <li>
          <Link
            to="/admin-dashboard/slider"
            className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Slider
          </Link>
        </li>
        <li>
          <Link
            to="/admin-dashboard/user"
            className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin-dashboard/settings"
            className="block py-2 px-4 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
