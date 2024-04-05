import axios from "axios";
import { create } from "zustand";
const BaseURL = `http://localhost:9000/api/v1`;

const AddStore = create((set) => ({
  SliderList: null,
  SliderListRequest: async () => {
    let res = await axios.get(`${BaseURL}/slider-list`);
    if (res.data["status"] === "success") {
      set({ SliderList: res.data["data"] });
    }
  },
  CategoryList: null,
  CategoryListRequest: async () => {
    let res = await axios.get(`${BaseURL}/category-list`);
    if (res.data["status"] === "success") {
      set({ CategoryList: res.data["data"] });
    }
  },
  AddsList: null,
  AddsListRequest: async () => {
    let res = await axios.get(`${BaseURL}/read-adds`);
    if (res.data["status"] === "success") {
      set({ AddsList: res.data["data"] });
    }
  },
}));

export default AddStore;
