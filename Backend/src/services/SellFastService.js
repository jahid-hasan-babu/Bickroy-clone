const SellFastModel = require("../model/SellFastModel");

const createSellService = async (req) => {
  try {
    let reqBody = req.body;
    await SellFastModel.create(reqBody);
    return { status: "success", message: "data create success" };
  } catch (error) {
    return { status: "fail", message: "data create fail !" };
  }
};

const readSellService = async () => {
  try {
    let data = await SellFastModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};

const updateSellService = async (req) => {
  try {
    let id = req.params.id;
    let reqBody = req.body;
    let query = { _id: id };
    await SellFastModel.updateOne(query, reqBody);
    return { status: "success", message: "data updated success" };
  } catch (error) {
    return { status: "fail", message: "data updated fail" };
  }
};

const deleteSellService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    await SellFastModel.deleteOne(query);
    return { status: "success", message: "data deleted success" };
  } catch (error) {
    return { status: "fail", message: "data deleted fail" };
  }
};

module.exports = {
  createSellService,
  readSellService,
  updateSellService,
  deleteSellService,
};
