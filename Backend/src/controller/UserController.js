const {
  userLoginService,
  verifyOTPService,
  saveProfileService,
  deleteProfileService,
  ReadProfileService,
} = require("../services/UserService");

exports.login = async (req, res) => {
  let result = await userLoginService(req);
  return res.status(200).json(result);
};

exports.verifyLogin = async (req, res) => {
  let result = await verifyOTPService(req);
  if (result["status"] === "success") {
    //Cookies Option
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000),
      httpOnly: false,
    };

    //Set Cookies With Response
    res.cookie("token", result["token"], cookieOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};

exports.createUser = async (req, res) => {
  let result = await saveProfileService(req);
  return res.status(201).json(result);
};

exports.UserLogout = async (res) => {
  let cookieOption = {
    expires: new Date(Date.now() - 24 * 6060 * 1000),
    httpOnly: false,
  };
  res.cookie("token", "", cookieOption);
  return res.status(200).json({ status: "success" });
};

exports.UpdateProfile = async (req, res) => {
  let result = await saveProfileService(req);
  return res.status(200).json(result);
};

exports.deleteProfile = async (req, res) => {
  let result = await deleteProfileService(req);
  return res.status(200).json(result);
};

exports.readProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  return res.status(200).json(result);
};
