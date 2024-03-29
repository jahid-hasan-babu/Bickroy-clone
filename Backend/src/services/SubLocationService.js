const SubLocationModel = require("../model/SubLocationModel");

const createSubLocationService = async (req) => {
  try {
    let reqBody = req.body;
    await SubLocationModel.create(reqBody);
    return { status: "success", message: "SubLocation create success" };
  } catch (error) {
    return { status: "fail", message: "SubLocation create fail !" };
  }
};

const readSubLocationService = async () => {
  try {
    let data = await SubLocationModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "SubLocation not found !" };
  }
};

const updateSubLocationService = async (req) => {
  try {
    let id = req.params.id;
    let reqBody = req.body;
    let query = { _id: id };
    await SubLocationModel.updateOne(query, reqBody);
    return { status: "success", message: "SubLocation update success" };
  } catch (error) {
    return { status: "fail", message: "SubLocation update fail" };
  }
};

const deleteSubLocationService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    await SubLocationModel.deleteOne(query);
    return { status: "success", message: "SubLocation delete success" };
  } catch (error) {
    return { status: "fail", message: "SubLocation delete fail" };
  }
};
module.exports = {
  createSubLocationService,
  readSubLocationService,
  updateSubLocationService,
  deleteSubLocationService,
};
