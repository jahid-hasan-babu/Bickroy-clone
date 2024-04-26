import React from "react";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { IoBagAddSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";

const MyAdds = () => {
  return (
    <div className="bg-slate-300">
      <div className="container  mx-auto px-4 py-8 md:py-16">
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
                  <MdCreateNewFolder />
                  <Link
                    to="/my-account/create-add"
                    className="pl-3 font-bold text-xl "
                  >
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
            <div className="md:mt-0 custom-media-query">
              <div className="bg-black sm:pt-10 p-10 sm:mr-[0px]: md:mr-[500px] rounded-md text-yellow-500">
                <div className="md:flex flex-col justify-center items-center">
                  <div>
                    <h1 className="font-bold custom-text-design ">My Adds</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAdds;
