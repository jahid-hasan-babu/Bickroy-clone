import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi"; // Import hamburger menu icon
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import logo from "../../assets/img/logo.png";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-green-500">
        <div className="navbar justify-between lg:mx-auto lg:max-w-6xl">
          <div>
            <Link to="/">
              <img className="w-24 lg:w-[15%]" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="sm:hidden">
            <button onClick={toggleNavbar} className="focus:outline-none">
              {isOpen ? (
                <AiOutlineClose className="text-white text-2xl" />
              ) : (
                <GiHamburgerMenu className="text-white text-2xl" />
              )}
            </button>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } sm:flex sm:items-center transition duration-300`}
          >
            <Link
              to="/adds"
              className="font-bold text-white text-lg pr-5 block lg:inline-block mb-2 lg:mb-0"
            >
              All adds
            </Link>
            <Link
              to="/login"
              className="font-bold text-white text-lg pr-5 block lg:inline-block mb-2 lg:mb-0"
            >
              My Account
            </Link>
            <Link
              to="/create-add"
              className="font-bold text-white text-lg bg-yellow-500 p-3 rounded-md block sm:inline-block"
            >
              Post Your Add
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppNavbar;
