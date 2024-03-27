const {
  createLocationService,
  readLocationService,
  updateLocationService,
  deleteLocationService,
} = require("../services/LocationService");

exports.createLocation = async (req, res) => {
  let result = await createLocationService(req);
  res.status(201).json(result);
};

exports.readAllLocation = async (req, res) => {
  let result = await readLocationService();
  res.status(200).json(result);
};

exports.updateLocation = async (req, res) => {
  let result = await updateLocationService(req);
  res.status(200).json(result);
};

exports.deleteLocation = async (req, res) => {
  let result = await deleteLocationService(req);
  res.status(200).json(result);
};
