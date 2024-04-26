import React, { useState, useEffect, useRef } from "react";
import UserSubmitButton from "./UserSubmitButton.jsx";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UserStore from "../../store/UserStore.js";

const OTPForm = () => {
  const { OTPFormData, OTPFormOnChange, VerifyLoginRequest } = UserStore();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);
  const [numFields] = useState(6); // Number of input fields
  const refs = useRef(Array.from({ length: 6 }, () => React.createRef()));

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index, value) => {
    const newOtp = [...OTPFormData.otp];
    newOtp[index] = value;
    OTPFormOnChange("otp", newOtp.join(""));

    // Move to the previous input field if the current field is emptied
    if (value === "" && index > 0) {
      refs.current[index - 1].focus();
    }

    // Move to the next input field if the current field is filled
    if (value !== "" && index < numFields - 1) {
      refs.current[index + 1].focus();
    }
  };

  const onFormSubmit = async () => {
    if (ValidationHelper.IsEmpty(OTPFormData.otp)) {
      toast.error("Valid PIN Required");
    } else {
      const res = await VerifyLoginRequest(OTPFormData.otp);
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
              A verification code has been sent to the email address you
              provided
            </p>
            <div className="flex justify-center items-center mb-4 flex-wrap">
              {Array.from({ length: numFields }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (refs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={OTPFormData.otp[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-12 h-12 text-xl border rounded-md py-2 px-3 bg-yellow-500 text-black placeholder-black text-center font-bold outline-none focus:border-yellow-700 mx-2 mb-2"
                  style={{ letterSpacing: "0.5em" }}
                />
              ))}
            </div>
            <UserSubmitButton
              onClick={onFormSubmit}
              submit={false}
              className="btn w-full md:w-80% font-bold text-lg border-none outline-none bg-yellow-500 text-black hover:text-white hover:bg-yellow-700 py-2 px-4 rounded-md"
              text="Submit"
            />
            <p className="text-lg text-yellow-500 mt-4">
              {timer > 0 ? (
                `OTP expires in ${timer} seconds`
              ) : (
                <Link to="/resend" className="underline">
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
