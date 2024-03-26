const BrandModel = require("../model/BrandModel");

const createBrandService = async (req) => {
  try {
    let reqBody = req.body;
    await BrandModel.create(reqBody);
    return { status: "success", message: "Brand create success" };
  } catch (error) {
    return { status: "fail", message: "Brand not create" };
  }
};

const readAllBrandsService = async () => {
  try {
    const data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};

const updateBrandService = async (req) => {
  try {
    let id = req.params.id;
    let reqBody = req.body;
    let query = { _id: id };
    await BrandModel.updateOne(query, reqBody);
    return { status: "success", message: "data update success" };
  } catch (error) {
    return { status: "fail", message: "data update fail !" };
  }
};

const deleteBrandService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    await BrandModel.deleteOne(query);
    return { status: "success", message: "data delete success" };
  } catch (error) {
    return { status: "fail", message: "data delete fail !" };
  }
};
module.exports = {
  createBrandService,
  readAllBrandsService,
  updateBrandService,
  deleteBrandService,
};
