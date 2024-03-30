const AboutModel = require("../model/AboutModel");

const createAboutService = async (req) => {
  try {
    let reqBody = req.body;
    await AboutModel.create(reqBody);
    return { status: "success", message: "data crate success" };
  } catch (error) {
    return { status: "fail", message: "data crate fail" };
  }
};

const readAboutService = async () => {
  try {
    let data = await AboutModel.find();
    const totalCount = data.length; // Calculate total data
    return { status: "success", data: data, totalCount: totalCount };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};

const updateAboutService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    let reqBody = req.body;
    await AboutModel.updateOne(query, reqBody);
    return { status: "success", message: "About update success" };
  } catch (error) {
    return { status: "fail", message: "About update fail !" };
  }
};

const deleteAboutService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    await AboutModel.deleteOne(query);
    return { status: "success", message: "About delete success" };
  } catch (error) {
    return { status: "fail", message: "About delete fail !" };
  }
};
module.exports = {
  createAboutService,
  readAboutService,
  updateAboutService,
  deleteAboutService,
};
