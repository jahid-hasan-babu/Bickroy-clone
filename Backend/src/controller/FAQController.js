const {
  createFAQService,
  readFAQService,
  updateFAQService,
  deleteFAQService,
} = require("../services/FAQService");

exports.createFAQ = async (req, res) => {
  let result = await createFAQService(req);
  res.status(201).json(result);
};

exports.readFAQ = async (req, res) => {
  let result = await readFAQService();
  res.status(200).json(result);
};

exports.updateFAQ = async (req, res) => {
  let result = await updateFAQService(req);
  res.status(200).json(result);
};

exports.deleteFAQ = async (req, res) => {
  let result = await deleteFAQService(req);
  res.status(200).json(result);
};
