const LocationModel = require("../model/LocationModel");

const createLocationService = async (req) => {
  try {
    let reqBody = req.body;
    await LocationModel.create(reqBody);
    return { status: "success", message: "location create success" };
  } catch (error) {
    return { status: "fail", message: "location create fail !" };
  }
};

const readLocationService = async () => {
  try {
    let data = await LocationModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "no data found" };
  }
};

const updateLocationService = async (req, res) => {
  try {
    let id = req.params.id;
    let reqBody = req.body;
    let query = { _id: id };
    await LocationModel.updateOne(query, reqBody);
    return { status: "success", message: "data update success" };
  } catch (error) {
    return { status: "fail", message: "data update fail !" };
  }
};

const deleteLocationService = async (req) => {
  try {
    let id = req.params.id;
    await LocationModel.deleteOne({ _id: id });
    return { status: "success", message: "data delete success" };
  } catch (error) {
    return { status: "fail", message: "data delete fail !" };
  }
};

module.exports = {
  createLocationService,
  readLocationService,
  updateLocationService,
  deleteLocationService,
};
