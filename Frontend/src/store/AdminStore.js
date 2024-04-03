// AdminStore.js
import { create } from "zustand";
import axios from "axios";

const BaseURL = `http://localhost:9000/api/v1`;

const AdminStore = create((set) => ({
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
        // Fixed token retrieval
        localStorage.setItem("token", res.data.token);
      } else {
        throw new Error("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Failed to login. Please try again later.");
    }
  },
}));

export default AdminStore;
