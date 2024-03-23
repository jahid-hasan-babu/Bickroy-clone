const { createAddService } = require("../services/AddsService");

exports.createAdd = async (req, res) => {
  let result = await createAddService(req);
  return res.status(200).json(result);
};
