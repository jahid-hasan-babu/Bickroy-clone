const {
  createAboutService,
  readAboutService,
  updateAboutService,
  deleteAboutService,
} = require("../services/AboutService");

exports.createAbout = async (req, res) => {
  let result = await createAboutService(req);
  res.status(201).json(result);
};

exports.readAbout = async (req, res) => {
  let result = await readAboutService();
  res.status(200).json(result);
};

exports.updateAbout = async (req, res) => {
  let result = await deleteAboutService(req);
  res.status(200).json(result);
};
