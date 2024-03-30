const MembershipModel = require("../model/MembershipModel");

const createMembershipService = async (req) => {
  try {
    let reqBody = req.body;
    await MembershipModel.create(reqBody);
    return { status: "success", message: "data create success" };
  } catch (error) {
    return { status: "fail", message: "data create fail" };
  }
};

const readMembershipService = async () => {
  try {
    let data = await MembershipModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};

const updateMembershipService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    let reqBody = req.body;
    await MembershipModel.updateOne(query, reqBody);
    return { status: "success", message: "data update success" };
  } catch (error) {
    return { status: "fail", message: "data update fail" };
  }
};

const deleteMembershipService = async (req) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    await MembershipModel.deleteOne(query);
    return { status: "success", message: "data delete success" };
  } catch (error) {
    return { status: "fail", message: "data delete fail" };
  }
};

module.exports = {
  createMembershipService,
  readMembershipService,
  updateMembershipService,
  deleteMembershipService,
};
