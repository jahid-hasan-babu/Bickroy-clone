const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    locationName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const LocationModel = model("locations", DataSchema);
module.exports = LocationModel;
