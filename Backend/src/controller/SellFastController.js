const {
  createSellService,
  readSellService,
  updateSellService,
  deleteSellService,
} = require("../services/SellFastService");
const { deleteSlider } = require("./SliderController");

exports.createSell = async (req, res) => {
  let result = await createSellService(req);
  res.status(201).json(result);
};

exports.readSell = async (req, res) => {
  let result = await readSellService();
  res.status(200).json(result);
};

exports.updateSell = async (req, res) => {
  let result = await updateSellService(req);
  res.status(200).json(result);
};

exports.deleteSell = async (req, res) => {
  let result = await deleteSellService(req);
  res.status(200).json(result);
};
