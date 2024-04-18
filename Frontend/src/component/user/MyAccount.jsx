import React from "react";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { IoBagAddSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import ProfileFrom from "./ProfileFrom";

const MyAccount = () => {
  return (
    <div className="container bg-slate-300 mx-auto px-4 py-8 md:py-16">
      <div className="justify-between lg:mx-auto lg:max-w-6xl ">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="bg-black p-10 rounded-md text-yellow-500 mb-8 md:mb-0 md:mr-8">
            <ul>
              <li className="flex items-center py-5">
                <IoSettings />
                <Link
                  to="/my-account/settings"
                  className="pl-3 font-bold text-xl"
                >
                  Settings
                </Link>
              </li>
              <li className="flex items-center py-5">
                <IoBagAddSharp />
                <Link
                  to="/my-account/my-adds"
                  className="pl-3 font-bold text-xl "
                >
                  My Adds
                </Link>
              </li>

              <li className="flex items-center py-5">
                <FaPhoneAlt />
                <Link className="pl-3 font-bold text-xl ">Phone</Link>
              </li>
              <li className="flex items-center py-5">
                <MdCreateNewFolder />
                <Link to="/create-add" className="pl-3 font-bold text-xl ">
                  Create Add
                </Link>
              </li>

              <li className="flex items-center py-5">
                <FaHome />
                <Link to="/" className="pl-3 font-bold text-xl ">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <ProfileFrom />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
