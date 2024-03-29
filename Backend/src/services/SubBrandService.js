const SubBrandModel = require("../model/Model");

const createSubBrandService = async (req) => {
  try {
    let reqBody = req.body;
    await SubBrandModel.create(reqBody);
    return { status: "success", message: "sub brand  created" };
  } catch (error) {
    return { status: "fail", message: "sub brand not created !" };
  }
};

const readSubBrandService = async () => {
  try {
    let data = await SubBrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "sub brand not found !" };
  }
};

const updateSubBrandService = async (req) => {
  try {
    let reqBody = req.body;
    let id = req.params.id;
    let query = { _id: id };
    await SubBrandModel.updateOne(query, reqBody);
    return { status: "success", message: "sub brand  update success" };
  } catch (error) {
    return { status: "fail", message: "sub brand not updated !" };
  }
};

const deleteSubBrandService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    await SubBrandModel.deleteOne(query);
    return { status: "success", message: "sub brand  delete success" };
  } catch (error) {
    return { status: "fail", message: "sub brand not deleted !" };
  }
};

module.exports = {
  createSubBrandService,
  readSubBrandService,
  updateSubBrandService,
  deleteSubBrandService,
};
