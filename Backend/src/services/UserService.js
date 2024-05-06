const UserModel = require("../model/UserModel");
const ProfileModel = require("../model/ProfileModel");
const sendEmailUtility = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");

const userLoginService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailText = `Your 6 digit code is = ${code}`;
    let EmailSubject = `OTP verification for Bikroy.com`;
    await sendEmailUtility(email, EmailText, EmailSubject);
    const expirationTime = new Date(Date.now() + 60000); // 1 minute expiration
    await UserModel.updateOne(
      { email: email },
      { $set: { otp: code, otpExpiration: expirationTime } },
      { upsert: true }
    );

    // Schedule task to remove OTP after one minute
    setTimeout(async () => {
      await UserModel.updateOne(
        { email: email },
        { $set: { otp: "0", otpExpiration: "" } }
      );
    }, 60000); // Remove OTP after 1 minute
    return { status: "success", message: "6 Digit OTP has been sent" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong !" };
  }
};

const verifyOTPService = async (req) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;

    //user count
    let total = await UserModel.find({ email: email, otp: otp }).count("total");
    if (total === 1) {
      let user_id = await UserModel.find({ email: email, otp: otp }).select(
        "_id"
      );

      let token = EncodeToken(email, user_id[0]["_id"].toString());
      await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });
      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (error) {
    return { status: "fail", message: "Invalid OTP" };
  }
};
const saveProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile save success" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

const ReadProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let result = await ProfileModel.find({ userID: user_id });
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", message: "Something went wrong" };
  }
};

const ReadUserService = async () => {
  try {
    let result = await ProfileModel.find();
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", message: "Something went wrong" };
  }
};

const deleteProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    await ProfileModel.deleteOne({ userID: user_id });
    return { status: "success", message: "Profile delete success" };
  } catch (error) {
    return { status: "fail", message: "Profile not found" };
  }
};

module.exports = {
  userLoginService,
  verifyOTPService,
  saveProfileService,
  deleteProfileService,
  ReadProfileService,
  ReadUserService,
};
