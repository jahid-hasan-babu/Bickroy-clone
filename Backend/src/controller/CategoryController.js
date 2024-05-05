const {
  createCategoryService,
  readCategoriesService,
  updateCategoriesService,
  deleteCategoriesService,
  CategoryByKeywordService,
} = require("../services/CategoryService");

exports.createCategory = async (req, res) => {
  let result = await createCategoryService(req);
  res.status(201).json(result);
};

exports.allCategory = async (req, res) => {
  let result = await readCategoriesService();
  res.status(200).json(result);
};

exports.CategoryListRemark = async (req, res) => {
  let result = await CategoryByKeywordService(req);
  res.status(200).json(result);
};

exports.updateCategory = async (req, res) => {
  let result = await updateCategoriesService(req);
  res.status(200).json(result);
};

exports.deleteCategory = async (req, res) => {
  let result = await deleteCategoriesService(req);
  res.status(200).json(result);
};
