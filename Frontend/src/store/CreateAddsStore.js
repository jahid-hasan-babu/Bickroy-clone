import Cookies from "js-cookie";
const BaseURL = `http://localhost:9000/api/v1`;
import { create } from "zustand";
import axios from "axios";

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
    image: null, // Initialize image property
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

  // Function to save add data
  saveAddRequest: async () => {
    try {
      const token = Cookies.get("token");
      const formDataToSend = new FormData();

      // Append form data to FormData object
      set((state) => {
        for (const key in state.addForm) {
          formDataToSend.append(key, state.addForm[key]);
        }

        // Ensure that the image file is attached to the FormData
        if (state.addForm.image) {
          formDataToSend.append("image", state.addForm.image);
        }

        return state;
      });

      // Send POST request to backend
      await axios.post(`${BaseURL}/upload`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset the form after successful submission
      set({ addForm: {} }); // Reset to an empty object
      return { status: "success" };
    } catch (error) {
      console.error("Error:", error);
      return { status: "fail", message: "Failed to create add" };
    }
  },
}));

export default CreateAddsStore;
