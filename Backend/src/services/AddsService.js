const AddModel = require("../model/AddModel");

const createAddService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await AddModel.create(reqBody);

    return { status: "success", message: "Data creation success" };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = { createAddService };
