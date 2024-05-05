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
  ListByKeywordRequest: async (Keyword) => {
    set({ AddsList: null });
    let res = await axios.get(`${BaseURL}/searchByKeyword/${Keyword}`);
    if (res.data["status"] === "success") {
      set({ AddsList: res.data["data"] });
    }
  },
  ListByCategoryKeywordRequest: async (Keyword) => {
    set({ AddsList: null });
    let res = await axios.get(`${BaseURL}/category-list-ByRemark/${Keyword}`);
    if (res.data["status"] === "success") {
      set({ AddsList: res.data["data"] });
    }
  },
  SearchKeyword: "",
  SetSearchKeyword: async (Keyword) => {
    set({ SearchKeyword: Keyword });
  },
  Details: null,
  DetailsRequest: async (addID) => {
    try {
      let res = await axios.get(`${BaseURL}/read-add-details/${addID}`);
      if (res.data["status"] === "success") {
        set({ Details: res.data["data"] });
      }
    } catch (error) {
      console.error("Error fetching ad details:", error);
    }
  },
}));

export default AddStore;
