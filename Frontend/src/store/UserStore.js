import { create } from "zustand";
import { setEmail, getEmail, setCookie } from "../utility/utility";
import axios from "axios";
import Cookies from "js-cookie";
const BaseURL = `http://localhost:9000/api/v1`;

const UserStore = create((set) => ({
  isLogin: () => {
    return !!Cookies.get("token");
  },
  LoginFormData: { email: "" },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      LoginFormData: {
        ...state.LoginFormData,
        [name]: value,
      },
    }));
  },

  OTPFormData: { otp: "" },
  OTPFormOnChange: (name, value) => {
    set((state) => ({
      OTPFormData: {
        ...state.OTPFormData,
        [name]: value,
      },
    }));
  },
  isFormSubmit: false,

  UserOTPRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.get(`${BaseURL}/login/${email}`);
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  VerifyLoginRequest: async (otp) => {
    set({ isFormSubmit: true });
    let email = getEmail();
    let res = await axios.get(`${BaseURL}/verifyLogin/${email}/${otp}`);
    set({ isFormSubmit: false });

    if (res.data.status === "success") {
      const token = res.data.token;
      const expiresIn = res.data.expiresIn;
      const expirationTime = new Date().getTime() + expiresIn * 1000;

      setCookie("token", token, expirationTime);
      return true;
    } else {
      return false;
    }
  },
}));

export default UserStore;
