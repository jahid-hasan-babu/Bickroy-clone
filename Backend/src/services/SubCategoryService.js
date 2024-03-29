const SubCategoryModel = require("../model/SubCategoryModel");

const createSubCategoryService = async (req) => {
  try {
    let reqBody = req.body;
    await SubCategoryModel.create(reqBody);
    return { status: "success", message: "subcategory create success" };
  } catch (error) {
    return { status: "fail", message: "subcategory create fail!" };
  }
};

const readAllSubCategoryService = async () => {
  try {
    let data = await SubCategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "sub category not found! " };
  }
};

const updateSubCategoryService = async (req) => {
  try {
    let id = req.params.id;
    let reqBody = req.body;
    let query = { _id: id };
    await SubCategoryModel.updateOne(query, reqBody);
    return { status: "success", message: "data update success" };
  } catch (error) {
    return { status: "fail", message: "data update fail !" };
  }
};

const deleteSubCategoryService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    await SubCategoryModel.deleteOne(query);
    return { status: "success", message: "data delete success" };
  } catch (error) {
    return { status: "fail", message: "data delete fail !" };
  }
};

module.exports = {
  createSubCategoryService,
  readAllSubCategoryService,
  updateSubCategoryService,
  deleteSubCategoryService,
};
