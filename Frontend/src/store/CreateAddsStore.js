import Cookies from "js-cookie";
import { create } from "zustand";
import axios from "axios";

const BaseURL = `http://localhost:9000/api/v1`;

const CreateAddsStore = create((set) => ({
  // Define initial state
  addForm: {
    locationName: "",
    subLocationName: "",
    categoryName: "",
    subcategoryName: "",
    condition: "",
    authenticity: "",
    features: "",
    phone: "",
    userName: "",
    description: "",
    price: "",
    image: "", // Initialize image property
  },

  // Function to update form field values
  addFormChange: (name, value) => {
    set((state) => ({
      addForm: {
        ...state.addForm,
        [name]: value,
      },
    }));
  },
  UserAddsList: null,
  UserAddListRequest: async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`${BaseURL}/read-user-add`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "success") {
        set({ UserAddsList: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching user adds:", error);
    }
  },
  isFormSubmit: false,
  // Function to save add data
  saveAddRequest: async (formData) => {
    try {
      const token = Cookies.get("token");
      const user_id = Cookies.get("user_id"); // Assuming user_id is stored in a cookie

      // Merge form data with additional fields
      const requestData = {
        ...formData,
        user_id: user_id, // Add user_id to the request data
      };
      set({ isFormSubmit: true });
      // Send POST request to backend
      const response = await axios.post(`${BaseURL}/create-add`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ isFormSubmit: false });

      return { status: "success", data: response.data.data };
    } catch (error) {
      set({ isFormSubmit: false });
      return { status: "fail", message: "Failed to create add" };
    }
  },

  deleteAddRequest: async (userId, addId) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.delete(
        `${BaseURL}/delete-user-add/${addId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        // Update UserAddsList after successful deletion
        set((state) => ({
          UserAddsList: state.UserAddsList.filter((item) => item.id !== addId),
        }));
        return { status: "success", message: "Add deleted successfully" };
      } else {
        return { status: "fail", message: "Failed to delete add" };
      }
    } catch (error) {
      console.error("Error deleting user add:", error);
      return { status: "error", message: "Error deleting add" };
    }
  },
}));

export default CreateAddsStore;
