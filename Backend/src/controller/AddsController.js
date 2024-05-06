const {
  createAddService,
  readAllAddService,
  readAllAddByUserService,
  deleteAddByUserService,
  searchByKeywordService,
  updateAddService,
  readUserAddsByUserService,
  readAddByIdService,
  deleteAddsService,
} = require("../services/AddsService");

exports.createAdd = async (req, res) => {
  try {
    let result = await createAddService(req);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.readAllAdds = async (req, res) => {
  let result = await readAllAddService();
  return res.status(200).json(result);
};
exports.readAddByID = async (req, res) => {
  let result = await readAddByIdService(req);
  return res.status(200).json(result);
};

exports.readUserAdd = async (req, res) => {
  let result = await readAllAddByUserService(req);
  return res.status(200).json(result);
};
exports.readUserAddOne = async (req, res) => {
  let result = await readUserAddsByUserService(req);
  return res.status(200).json(result);
};
exports.updateUserAdd = async (req, res) => {
  let result = await updateAddService(req);
  return res.status(200).json(result);
};
exports.updateUserAddById = async (req, res) => {
  let result = await readUserAddsByUserService(req);
  return res.status(200).json(result);
};

exports.deleteAddByUser = async (req, res) => {
  let result = await deleteAddByUserService(req);
  return res.status(200).json(result);
};
exports.deleteAdds = async (req, res) => {
  let result = await deleteAddsService(req);
  return res.status(200).json(result);
};

exports.searchByKeyword = async (req, res) => {
  let result = await searchByKeywordService(req);
  return res.status(200).json(result);
};
