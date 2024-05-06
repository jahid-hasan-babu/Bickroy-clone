const {
  userLoginService,
  verifyOTPService,
  saveProfileService,
  deleteProfileService,
  ReadProfileService,
  ReadUserService,
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

exports.UserLogout = async (req, res) => {
  try {
    let cookieOption = {
      expires: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      httpOnly: false,
    };

    // Clear the "token" cookie by setting it to an empty value with an expired date
    res.cookie("token", "", { ...cookieOption, expires: new Date(0) });

    // Return success response
    return res.status(200).json({ status: "success" });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error during logout:", error);
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
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

exports.reaAllUser = async (req, res) => {
  let result = await ReadUserService();
  return res.status(200).json(result);
};
