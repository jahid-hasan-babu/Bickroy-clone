const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    subcategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    brandID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    modelID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    locationID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    subLocationID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    subcategoryName: {
      type: String,
      required: true,
      trim: true,
    },
    condition: {
      type: String,
      required: true,
      trim: true,
    },
    authenticity: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: String,
      trim: true,
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
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    img4: { type: String, required: true },
    img5: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const AddModel = model("adds", DataSchema);
module.exports = AddModel;
