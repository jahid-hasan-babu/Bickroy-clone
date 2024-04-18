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

  ProfileForm: {
    name: "",
    locationName: "",
    subLocationName: "",
    phone: "",
  },

  ProfileFormChange: (name, value) => {
    set((state) => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value,
      },
    }));
  },

  ProfileDetails: null,

  ProfileDetailsRequest: async () => {
    try {
      let token = Cookies.get("token"); // Retrieve token from cookies
      let res = await axios.get(`${BaseURL}/read-profile`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in headers
      });
      if (res.data["data"].length > 0) {
        set({ ProfileDetails: res.data["data"][0] });
        set({ ProfileForm: res.data["data"][0] });
      } else {
        set({ ProfileDetails: [] });
      }
    } catch (e) {
      console.error("Error fetching profile details:", e);
    }
  },

  ProfileSaveRequest: async (PostBody) => {
    try {
      let token = Cookies.get("token");
      set({ isFormSubmit: true });
      let res = await axios.post(`${BaseURL}/update-profile`, PostBody, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ isFormSubmit: false });
      return res.data["status"] === "success";
    } catch (e) {
      console.error("Error saving profile:", e);
      set({ isFormSubmit: false });
    }
  },

  ProfileDeleteRequest: async () => {
    try {
      let token = Cookies.get("token");

      let res = await axios.delete(`${BaseURL}/delete-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data["status"] === "success";
    } catch (e) {
      console.error("Error deleting profile:", e);
    }
  },
  ProfileLogoutRequest: async () => {
    try {
      let token = Cookies.get("token");
      let res = await axios.get(`${BaseURL}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data["status"] === "success";
    } catch (e) {
      console.error("Error deleting profile:", e);
    }
  },
}));

export default UserStore;
