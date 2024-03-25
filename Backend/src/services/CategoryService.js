const CategoryModel = require("../model/CategoryModel");

const createCategoryService = async (req) => {
  try {
    let reqBody = req.body;
    await CategoryModel.create(reqBody);
    return { status: "success", message: "Category create success" };
  } catch (error) {
    return { status: "fail", message: "Category create fail !" };
  }
};

const readCategoriesService = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};

const updateCategoriesService = async (req) => {
  try {
    let id = req.params.id;
    let reqBody = req.body;
    let data = await CategoryModel.updateOne({ _id: id }, reqBody);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};
const deleteCategoriesService = async (req) => {
  try {
    let id = req.params.id;
    await CategoryModel.deleteOne({ _id: id });
    return { status: "success", message: "data delete success" };
  } catch (error) {
    return { status: "fail", message: "data delete fail !" };
  }
};

module.exports = {
  createCategoryService,
  readCategoriesService,
  updateCategoriesService,
  deleteCategoriesService,
};
