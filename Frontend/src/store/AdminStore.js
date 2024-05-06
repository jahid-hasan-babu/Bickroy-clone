// AdminStore.js
import { create } from "zustand";
import axios from "axios";

const BaseURL = `http://localhost:9000/api/v1`;

const AdminStore = create((set) => ({
  isLogin: () => {
    return !!localStorage.getItem("token");
  },
  AdminLoginData: { email: "", password: "" },
  setLoginFormData: (formData) => {
    set((state) => ({
      AdminLoginData: {
        ...state.AdminLoginData,
        ...formData,
      },
    }));
  },
  login: async (email, password) => {
    try {
      const res = await axios.get(
        `${BaseURL}/login-admin/${email}/${password}`
      );

      if (res && res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          localStorage.removeItem("token");
        }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
      } else {
        throw new Error("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Failed to login. Please try again later.");
    }
  },
  addList: null,
  totalAddRequest: async () => {
    try {
      const res = await axios.get(`${BaseURL}/read-adds`);
      if (res.data["status"] === "success") {
        set({ addList: res.data["data"] });
      }
    } catch (error) {
      return error;
    }
  },
  userList: null,
  totalUserRequest: async () => {
    try {
      const res = await axios.get(`${BaseURL}/read-user`);
      if (res.data["status"] === "success") {
        set({ userList: res.data["data"] });
      }
    } catch (error) {
      return error;
    }
  },
}));

export default AdminStore;
