// AdminLogin.jsx
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminStore from "../../store/AdminStore";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { AdminLoginData, setLoginFormData, login } = AdminStore();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (AdminLoginData.email === "" || AdminLoginData.password === "") {
      toast.error("Email and password are required");
      return;
    }

    try {
      await login(AdminLoginData.email, AdminLoginData.password); // Corrected: Pass email and password to login function
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error("Failed to login. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 ">
      <div className="flex justify-center">
        <div className="md:w-2/6 ">
          <div className="bg-slate-500 shadow-md  rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl font-bold text-white mb-4 text-center">
              Admin Login
            </h1>
            <form onSubmit={handleSubmit}>
              <h1 className="text-xl pb-3 text-white font-bold">Email:</h1>
              <input
                value={AdminLoginData.email}
                onChange={handleFormChange}
                name="email"
                placeholder="Enter Your Email"
                type="text"
                className="w-full border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              />
              <h1 className="text-xl pb-3 text-white font-bold">Password:</h1>
              <input
                value={AdminLoginData.password}
                onChange={handleFormChange}
                name="password"
                placeholder="Enter Your Password"
                type="password"
                className="w-full mb-5 border border-gray-300 rounded py-2 px-3  leading-tight focus:outline-none focus:border-gray-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default AdminLogin;
