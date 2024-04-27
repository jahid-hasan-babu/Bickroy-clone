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

    try {
      // Make the request to verify login with OTP
      let res = await axios.get(`${BaseURL}/verifyLogin/${email}/${otp}`);

      if (res.data.status === "success") {
        // If login is successful, extract token and expiresIn from response
        const { token, expiresIn } = res.data;

        // Calculate expiration time based on expiresIn received from the server
        const expirationTime = new Date().getTime() + expiresIn * 1000;

        // Set token cookie with expiration time set to far future
        document.cookie = `token=${token}; expires=${new Date(
          expirationTime
        ).toUTCString()}; path=/; max-age=31536000`;

        // Return true to indicate successful login
        return true;
      } else {
        // Return false to indicate unsuccessful login
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      // Ensure that isFormSubmit flag is set to false regardless of the outcome
      set({ isFormSubmit: false });
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
  divisions: [],
  selectedDivision: "",
  districts: [],
  fetchDivisions: async () => {
    try {
      const response = await axios.get("https://bdapis.com/api/v1.1/divisions");
      const divisionsData = response.data.data;
      set({ divisions: divisionsData });
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
  },
  fetchDistricts: async (division) => {
    try {
      const response = await axios.get(
        `https://bdapis.com/api/v1.1/division/${division}`
      );
      const districtsData = response.data.data.map(
        (district) => district.district
      );
      set({ districts: districtsData });
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  },
  setSelectedDivision: (division) => set({ selectedDivision: division }),
}));

export default UserStore;
