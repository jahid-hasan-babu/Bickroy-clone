const SliderModel = require("../model/SliderModel");

const createSliderService = async (req) => {
  try {
    let reqBody = req.body;
    await SliderModel.create(reqBody);
    return { status: "success", message: "Slider create success" };
  } catch (error) {
    return { status: "fail", message: "Slider create fail !" };
  }
};

const readSliderService = async () => {
  try {
    let data = await SliderModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "Slider not found !" };
  }
};

const updateSliderService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    let reqBody = req.body;
    await SliderModel.updateOne(query, reqBody);
    return { status: "success", message: "Slider update success" };
  } catch (error) {
    return { status: "fail", message: "Slider update fail !" };
  }
};

const deleteSliderService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    await SliderModel.deleteOne(query);
    return { status: "success", message: "Slider delete success" };
  } catch (error) {
    return { status: "fail", message: "Slider delete fail !" };
  }
};

module.exports = {
  createSliderService,
  readSliderService,
  updateSliderService,
  deleteSliderService,
};
