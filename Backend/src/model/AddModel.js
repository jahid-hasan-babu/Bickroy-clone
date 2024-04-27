const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    // categoryID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    // subcategoryID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    // brandID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    // modelID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    // locationID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    // subLocationID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    locationName: {
      type: String,
      required: true,
      trim: true,
    },
    subLocationName: {
      type: String,
      required: true,
      trim: true,
    },
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    subcategoryName: {
      type: String,
      // required: true,
      trim: true,
    },
    condition: {
      type: String,
      trim: true,
    },
    authenticity: {
      type: String,
      trim: true,
    },
    features: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const AddModel = model("adds", DataSchema);
module.exports = AddModel;
