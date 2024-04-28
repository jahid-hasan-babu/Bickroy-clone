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
}));

export default CreateAddsStore;
