const {
  createSliderService,
  readSliderService,
  updateSliderService,
  deleteSliderService,
} = require("../services/SliderService");

exports.createSlider = async (req, res) => {
  let result = await createSliderService(req);
  res.status(201).json(result);
};

exports.readAllSlider = async (req, res) => {
  let result = await readSliderService();
  res.status(200).json(result);
};

exports.updateSlider = async (req, res) => {
  let result = await updateSliderService(req);
  res.status(200).json(result);
};

exports.deleteSlider = async (req, res) => {
  let result = await deleteSliderService(req);
  res.status(200).json(result);
};
