const AddModel = require("../model/AddModel");
const cloudinary = require("../utility/cloudinary");

const createAddService = async (req) => {
  // Retrieve user_id from headers
  const user_id = req.headers.user_id;
  try {
    // Extract data from request
    const {
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
      image,
    } = req.body;

    // Validate required fields
    if (!locationName || !categoryName || !price || !user_id) {
      throw new Error("Missing required fields");
    }

    // Upload image if provided
    let imageUrl = null;
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "addsImage",
      });
      if (!uploadRes || !uploadRes.secure_url) {
        throw new Error("Image upload failed");
      }
      imageUrl = uploadRes.secure_url;
    }

    // Create new add document
    const add = new AddModel({
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
      image: imageUrl,
      userID: user_id,
    });

    // Save add document
    const savedAdd = await add.save();

    return {
      status: "success",
      message: "Data created successfully",
      data: savedAdd,
    };
  } catch (error) {
    console.error("Error during data creation:", error);
    return {
      status: "fail",
      message: error.message || "Error during data creation",
    };
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

const readAddByIdService = async (req) => {
  try {
    const addId = req.params.addID; // Change to addID to match route parameter name
    const data = await AddModel.find({ _id: addId });

    if (data.length === 0) {
      return { status: "fail", message: "Data not found!" };
    }

    return { status: "success", data: data };
  } catch (error) {
    console.error("Error reading add by ID:", error);
    return {
      status: "error",
      message: "An error occurred while reading add by ID.",
    };
  }
};

module.exports = readAddByIdService;

const readAllAddByUserService = async (req) => {
  try {
    const user_id = req.headers.user_id; // Assuming user_id is sent in request headers
    const data = await AddModel.find({ userID: user_id });
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "Data not found!" };
  }
};
const updateAddService = async (req) => {
  try {
    const user_id = req.headers.user_id; // Assuming user_id is sent in request headers
    const addId = req.params.addId;

    // Check if the user has permission to update the add
    const add = await AddModel.findOne({ _id: addId, userID: user_id });

    if (!add) {
      return {
        status: "fail",
        message: "Add not found or you don't have permission to update it",
      };
    }

    // Update the add document with the provided fields
    const updatedAdd = await AddModel.findOneAndUpdate(
      { _id: addId, userID: user_id },
      { $set: req.body },
      { new: true } // Return the updated document
    );

    if (!updatedAdd) {
      return {
        status: "fail",
        message: "Failed to update the add",
      };
    }

    return {
      status: "success",
      message: "Add updated successfully",
      data: updatedAdd,
    };
  } catch (error) {
    console.error("Error during add update:", error);
    return {
      status: "fail",
      message: "Failed to update add",
    };
  }
};

const readUserAddsByUserService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const addId = req.params.addId; // Assuming user_id is sent in request headers
    const data = await AddModel.find({ _id: addId, userID: user_id });
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: "Failed to fetch user adds" };
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
      { features: SearchRegex },
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
  updateAddService,
  readUserAddsByUserService,
  readAddByIdService,
};
