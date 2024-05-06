const AdminModel = require("../model/AdminModel");
const AddModel = require("../model/AddModel");
const jwt = require("jsonwebtoken");
const ProfileModel = require("../model/ProfileModel");

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

const deleteUserByAdminService = async (req) => {
  try {
    const userId = req.params.userId;
    const user = await ProfileModel.findOne({ _id: userId });
    if (!user) {
      return {
        status: "fail",
        message: "Add not found or you don't have permission to delete it",
      };
    }

    // Delete the add
    const deletedUser = await ProfileModel.deleteOne({
      _id: userId,
    });

    // Check if the add was successfully deleted
    if (deletedUser.deletedCount === 0) {
      return {
        status: "fail",
        message: "Failed to delete the add",
      };
    }

    return {
      status: "success",
      message: "Add deleted successfully",
    };
  } catch (error) {
    return {
      status: "fail",
      message: "Failed to delete add",
    };
  }
};

module.exports = {
  createAdminService,
  AdminLogin,
  updateAdminService,
  approveAddService,
  deleteUserByAdminService,
};
