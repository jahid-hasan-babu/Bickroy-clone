const AdminModel = require("../model/AdminModel");
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

module.exports = { createAdminService, AdminLogin, updateAdminService };
