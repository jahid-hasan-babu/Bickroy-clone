import React, { useState, useEffect } from "react";
import UserSubmitButton from "./UserSubmitButton.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UserStore from "../../store/UserStore.js";

const OTPForm = () => {
  let { OTPFormData, OTPFormOnChange, VerifyLoginRequest } = UserStore();
  let navigate = useNavigate();

  const [timer, setTimer] = useState(60); // Initial timer value (60 seconds)

  useEffect(() => {
    // Countdown timer effect
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(countdown); // Stop the timer when it reaches 0
          return prevTimer;
        }
        return prevTimer - 1; // Decrease the timer by 1 second
      });
    }, 1000); // Update every second

    // Clean up timer effect
    return () => clearInterval(countdown);
  }, []); // Run once on component mount

  const onFormSubmit = async () => {
    if (ValidationHelper.IsEmpty(OTPFormData.otp)) {
      toast.error("Valid PIN Required");
    } else {
      let res = await VerifyLoginRequest(OTPFormData.otp);
      res ? navigate("/") : toast.error("Something Went Wrong !");
    }
  };

  return (
    <div className="container mx-auto my-11 px-4 py-8 md:py-16">
      <div className="flex items-center justify-center">
        <div className="w-full md:w-1/2">
          <div className="bg-black rounded-lg shadow-md px-6 py-8 md:py-11">
            <h4 className="text-2xl text-yellow-500 font-bold mb-4">
              Enter Verification Code
            </h4>
            <p className="text-lg text-yellow-500 mb-4">
              A verification code has been sent to the email address you provide
            </p>
            <input
              value={OTPFormData.otp}
              onChange={(e) => {
                OTPFormOnChange("otp", e.target.value);
              }}
              placeholder="Verification"
              type="text"
              className="w-full md:w-80% border  rounded-md py-3 px-3 mb-4 border-none outline-none bg-yellow-500 placeholder-black"
            />
            <UserSubmitButton
              onClick={onFormSubmit}
              submit={false}
              className="btn w-full md:w-80% font-bold text-lg border-none outline-none bg-yellow-500 text-black hover:text-white hover:bg-yellow-700 py-2 px-4 rounded-md"
              text="Submit"
            />
            <p className="text-lg text-yellow-500 mt-4">
              {timer > 0 ? (
                `OTP expired in ${timer} seconds`
              ) : (
                <Link to="/login" className="underline">
                  Resend OTP
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default OTPForm;
