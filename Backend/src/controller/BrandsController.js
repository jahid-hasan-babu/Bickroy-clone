const {
  createBrandService,
  readAllBrandsService,
  updateBrandService,
  deleteBrandService,
} = require("../services/BrandsService");

exports.createBrand = async (req, res) => {
  let result = await createBrandService(req);
  res.status(201).json(result);
};

exports.readAll = async (req, res) => {
  let result = await readAllBrandsService();
  res.status(200).json(result);
};

exports.updateBrand = async (req, res) => {
  let result = await updateBrandService(req);
  res.status(200).json(result);
};
exports.deleteBrand = async (req, res) => {
  let result = await deleteBrandService(req);
  res.status(200).json(result);
};
