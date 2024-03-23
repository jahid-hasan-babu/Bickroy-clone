const {
  createAddService,
  readAllAddService,
  readAllAddByUserService,
  deleteAddByUserService,
} = require("../services/AddsService");

exports.createAdd = async (req, res) => {
  let result = await createAddService(req);
  return res.status(200).json(result);
};

exports.readAllAdds = async (req, res) => {
  let result = await readAllAddService();
  return res.status(200).json(result);
};

exports.readUserAdd = async (req, res) => {
  let result = await readAllAddByUserService(req);
  return res.status(200).json(result);
};

exports.deleteAddByUser = async (req, res) => {
  let result = await deleteAddByUserService(req);
  return res.status(200).json(result);
};
