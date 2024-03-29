const AdminModel = require("../model/AdminModel");
const AddModel = require("../model/AddModel");
const jwt = require("jsonwebtoken");

const createAdminService = async (req) => {
  try {
    let reqBody = req.body;
    await AdminModel.create(reqBody);
    return { status: "success", message: "Admin create success" };
  } catch (error) {
    return { status: "fail", message: "Admin not create!" };
  }
};

const AdminLogin = async (req) => {
  try {
    const email = req.params.email;
    const password = req.params.password;
    const data = await AdminModel.findOne({ email, password });
    if (data) {
      const Payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: data.email,
      };
      const token = jwt.sign(Payload, "SecretKey123456789");
      return { status: "success", token: token };
    } else {
      return { status: "fail", message: "token not created" };
    }
  } catch (error) {
    return { status: "fail", message: "Internal Server Error" };
  }
};

const updateAdminService = async (req) => {
  try {
    let email = req.headers["email"];
    let newPassword = req.body.password;
    await AdminModel.updateOne({ email: email }, { password: newPassword });

    return { status: "success", message: "Password updated successfully" };
  } catch (error) {
    return { status: "fail", message: "Password update failed" };
  }
};

//approve adds
const approveAddService = async (req) => {
  try {
    const { adId } = req.params;

    // Find the ad by ID and update its approvedByAdmin field to true
    const approvedAd = await AddModel.findByIdAndUpdate(
      adId,
      { approvedByAdmin: true },
      { new: true }
    );
    return { status: "success", data: approvedAd };
  } catch (error) {
    return { status: "fail", message: "data not found" };
  }
};

const deleteAddService = async (req) => {
  try {
    const { adId } = req.params;
    await AddModel.findByIdAndDelete(adId);
    return { status: "success", message: "add delete success" };
  } catch (error) {
    return { status: "fail", message: "add delete fail" };
  }
};
module.exports = {
  createAdminService,
  AdminLogin,
  updateAdminService,
  approveAddService,
  deleteAddService,
};
