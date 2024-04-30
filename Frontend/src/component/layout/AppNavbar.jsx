import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi"; // Import hamburger menu icon
import { AiOutlineClose } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md"; // Import account circle icon
import logo from "../../assets/img/logo.png";
import UserStore from "../../store/UserStore";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isLogin } = UserStore();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLogin();
      setIsLoggedIn(loggedIn);
    };

    // Check login status initially
    checkLoginStatus();

    // Set up interval to periodically check login status
    const interval = setInterval(() => {
      checkLoginStatus();
    }, 300000); // Check every 5 minutes (adjust interval as needed)

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-black sticky top-0 z-50 shadow-md">
        <div className="navbar justify-between lg:mx-auto  lg:max-w-6xl">
          <div>
            <Link to="/">
              <img className="w-24 lg:w-[15%]" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="sm:hidden">
            <button onClick={toggleNavbar} className="focus:outline-none">
              {isOpen ? (
                <AiOutlineClose className="text-yellow-500 text-2xl" />
              ) : (
                <GiHamburgerMenu className="text-yellow-500 text-2xl" />
              )}
            </button>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } sm:flex sm:items-center transition duration-300`}
          >
            <Link
              to="/all-adds"
              className="font-bold text-yellow-500 text-lg pr-5 block lg:inline-block mb-2 lg:mb-0"
            >
              All adds
            </Link>
            <Link
              to={isLoggedIn ? "/my-account/settings" : "/login"}
              className="font-bold text-yellow-500 text-lg pr-5  lg:inline-block mb-2 lg:mb-0 flex items-center"
            >
              {isLoggedIn ? (
                <div className="flex items-center">
                  <MdAccountCircle className="mr-1" />
                  My Account
                </div>
              ) : (
                "Login"
              )}
            </Link>
            <Link
              to={isLoggedIn ? "/my-account/create-add" : "/login"}
              className="font-bold text-black text-lg bg-yellow-500 p-3 rounded-md block sm:inline-block"
            >
              {isLoggedIn ? "Create Your Add" : " Create Your Add"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppNavbar;
