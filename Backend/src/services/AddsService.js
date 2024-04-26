const AddModel = require("../model/AddModel");
const cloudinary = require("../utility/cloudinary");

const uploadToCloudinary = async (file) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "image", // Optional: Specify the folder where you want to store the image
    });

    // Return the uploaded image details
    return {
      public_id: result.public_id,
      url: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height,
      // Add more details as needed
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error; // Throw the error to handle it in the calling function
  }
};

const createAddService = async (req) => {
  try {
    let user_id = req.headers.user_id;

    // Check if file is included in the request
    if (!req.file) {
      return { status: "fail", message: "No file uploaded" };
    }

    // Upload file to Cloudinary
    const imageDetails = await uploadToCloudinary(req.file);

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

    // Use imageDetails returned by uploadToCloudinary
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
        // Use imageDetails to set image field
        public_id: imageDetails.public_id,
        url: imageDetails.url,
        format: imageDetails.format,
        width: imageDetails.width,
        height: imageDetails.height,
      },
    });

    return { status: "success", message: "Data creation success" };
  } catch (error) {
    console.error("Error during data creation:", error);
    return { status: "fail", message: "Error during data creation", error };
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
