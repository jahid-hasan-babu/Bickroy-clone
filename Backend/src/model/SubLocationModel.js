const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    subLocationName: {
      type: String,
      trim: true,
      required: true,
    },
    locationID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const SubLocationModel = model("sublocations", DataSchema);
module.exports = SubLocationModel;
