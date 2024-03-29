const {
  createSubLocationService,
  readSubLocationService,
  updateSubLocationService,
  deleteSubLocationService,
} = require("../services/SubLocationService");

exports.createSubLocation = async (req, res) => {
  let result = await createSubLocationService(req);
  res.status(201).json(result);
};

exports.readAllSubLocation = async (req, res) => {
  let result = await readSubLocationService();
  res.status(200).json(result);
};

exports.updateSubLocation = async (req, res) => {
  let result = await updateSubLocationService(req);
  res.status(200).json(result);
};

exports.deleteSubLocation = async (req, res) => {
  let result = await deleteSubLocationService(req);
  res.status(200).json(result);
};
