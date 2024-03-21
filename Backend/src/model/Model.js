const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    subBrandName: {
      type: String,
      trim: true,
      required: true,
    },
    brandID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Model = model("models", DataSchema);
module.exports = Model;
