const {
  createSubBrandService,
  readSubBrandService,
  updateSubBrandService,
  deleteSubBrandService,
} = require("../services/SubBrandService");

exports.createSubBrand = async (req, res) => {
  let result = await createSubBrandService(req);
  res.status(201).json(result);
};

exports.readSubBrand = async (req, res) => {
  let result = await readSubBrandService();
  res.status(200).json(result);
};

exports.updateSubBrand = async (req, res) => {
  let result = await updateSubBrandService(req);
  res.status(200).json(result);
};

exports.deleteSubBrand = async (req, res) => {
  let result = await deleteSubBrandService(req);
  res.status(200).json(result);
};
