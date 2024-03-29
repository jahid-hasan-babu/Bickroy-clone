const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    des: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const SliderModel = model("sliders", DataSchema);
module.exports = SliderModel;
