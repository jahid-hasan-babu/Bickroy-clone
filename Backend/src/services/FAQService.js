const FAQModel = require("../model/FAQmodel");

const createFAQService = async (req) => {
  try {
    let reqBody = req.body;
    await FAQModel.create(reqBody);
    return { status: "success", message: "data create success" };
  } catch (error) {
    return { status: "fail", message: "data create fail" };
  }
};

const readFAQService = async () => {
  try {
    let data = await FAQModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};

const updateFAQService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    let reqBody = req.body;
    await FAQModel.updateOne(query, reqBody);
    return { status: "success", message: "FAQ update success" };
  } catch (error) {
    return { status: "fail", message: "FAQ update fail !" };
  }
};

const deleteFAQService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    await FAQModel.deleteOne(query);
    return { status: "success", message: "FAQ delete success" };
  } catch (error) {
    return { status: "fail", message: "FAQ delete fail !" };
  }
};

module.exports = {
  createFAQService,
  readFAQService,
  updateFAQService,
  deleteFAQService,
};
