import React from "react";
import UserSubmitButton from "./UserSubmitButton";
import UserStore from "../../store/UserStore";
import ValidationHelper from "./../../utility/ValidationHelper";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  let navigate = useNavigate();
  let { LoginFormData, LoginFormOnChange, UserOTPRequest } = UserStore();

  const onFromSubmit = async () => {
    if (!ValidationHelper.IsEmail(LoginFormData.email)) {
      toast.error("Valid Email Address Required");
    } else {
      let res = await UserOTPRequest(LoginFormData.email);
      res ? navigate("/otp") : toast.error("Something Went Wrong !");
    }
  };
  return (
    <div className="container mx-auto my-11 px-4 py-8 md:py-16">
      <div className="flex items-center justify-center">
        <div className="w-full md:w-1/2">
          <div className="bg-black rounded-lg shadow-md px-6 py-8 md:py-11">
            <h4 className="text-2xl text-yellow-500 font-bold mb-4">
              Enter Your Email
            </h4>
            <p className="text-lg text-yellow-500 mb-4">
              A verification code will be sent to the email address you provide
            </p>
            <input
              value={LoginFormData.email}
              onChange={(e) => {
                LoginFormOnChange("email", e.target.value);
              }}
              placeholder="Email Address"
              type="email"
              className="w-full md:w-80% border  rounded-md py-3 px-3 mb-4 border-none outline-none bg-yellow-500 placeholder-black"
            />
            <UserSubmitButton
              onClick={onFromSubmit}
              className="btn w-full md:w-80% font-bold text-lg border-none outline-none bg-yellow-500 text-black hover:text-white hover:bg-yellow-700 py-2 px-4 rounded-md"
              text="Next"
            />
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default LoginForm;
