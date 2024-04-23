const AddModel = require("../model/AddModel");
const cloudinary = require("../utility/cloudinary");

const createAddService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    // let image = req.body.image; // Define image before using it
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "adds",
    });
    let {
      locationName,
      subLocationName,
      categoryName,
      subcategoryName,
      condition,
      authenticity,
      features,
      phone,
      userName,
      description,
      price,
    } = req.body;
    req.body.userID = user_id;
    await AddModel.create({
      locationName,
      subLocationName,
      categoryName,
      subcategoryName,
      condition,
      authenticity,
      features,
      phone,
      userName,
      description,
      price,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    return { status: "success", message: "Data creation success" };
  } catch (error) {
    return { status: "fail", data: error };
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

    const add = await AddModel.findOne({ _id: addId, userID: user_id });

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
    };
  }
};

const searchByKeywordService = async (req) => {
  try {
    let SearchRegex = { $regex: req.params.Keyword, $options: "i" };
    let SearchParams = [
      { categoryName: SearchRegex },
      { subcategoryName: SearchRegex },
      { condition: SearchRegex },
    ];
    let SearchQuery = { $or: SearchParams };
    let MatchStage = { $match: SearchQuery };

    let data = await AddModel.aggregate([MatchStage]);
    return { status: "success", data: data };
  } catch (error) {
    return {
      status: "fail",
      message: "no data found",
    };
  }
};
module.exports = {
  createAddService,
  readAllAddService,
  readAllAddByUserService,
  deleteAddByUserService,
  searchByKeywordService,
};
