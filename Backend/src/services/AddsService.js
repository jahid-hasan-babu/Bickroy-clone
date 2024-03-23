const AddModel = require("../model/AddModel");

const createAddService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await AddModel.create(reqBody);

    return { status: "success", message: "Data creation success" };
  } catch (error) {
    return { status: "fail", message: "Data creation fail !" };
  }
};

const readAllAddService = async () => {
  try {
    const data = await AddModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "Data not found!" };
  }
};

const readAllAddByUserService = async (req) => {
  try {
    const user_id = req.headers.user_id; // Assuming user_id is sent in request headers
    const data = await AddModel.find({ userID: user_id });
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "Data not found!" };
  }
};

const deleteAddByUserService = async (req) => {
  try {
    const user_id = req.headers.user_id; // Assuming user_id is sent in request headers
    const addId = req.params.addId;

    // Find the add to check if it exists and if its userID matches the user_id
    const add = await AddModel.findOne({ _id: addId, userID: user_id });

    // If the add doesn't exist or its userID doesn't match the user_id, return a failure response
    if (!add) {
      return {
        status: "fail",
        message: "Add not found or you don't have permission to delete it",
      };
    }

    // Delete the add
    const deletedAdd = await AddModel.deleteOne({
      _id: addId,
      userID: user_id,
    });

    // Check if the add was successfully deleted
    if (deletedAdd.deletedCount === 0) {
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
      error: error.toString(),
    };
  }
};

module.exports = {
  createAddService,
  readAllAddService,
  readAllAddByUserService,
  deleteAddByUserService,
};
