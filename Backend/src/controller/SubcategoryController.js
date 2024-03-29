const {
  createSubCategoryService,
  readAllSubCategoryService,
  updateSubCategoryService,
  deleteSubCategoryService,
} = require("../services/SubCategoryService");

exports.createSubCategory = async (req, res) => {
  let result = await createSubCategoryService(req);
  res.status(201).json(result);
};

exports.readAll = async (req, res) => {
  let result = await readAllSubCategoryService();
  res.status(200).json(result);
};

exports.updateCategory = async (req, res) => {
  let result = await updateSubCategoryService(req);
  res.status(200).json(result);
};

exports.deleteCategory = async (req, res) => {
  let result = await deleteSubCategoryService(req);
  res.status(200).json(result);
};
