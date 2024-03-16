const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true, versionKey: false }
);

const BrandModel = model("brands", DataSchema);
module.exports = BrandModel;
