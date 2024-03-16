const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    subCategoryName: {
      type: String,
      required: true,
      trim: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const SubCategoryModel = model("subcategories", DataSchema);

module.exports = SubCategoryModel;
