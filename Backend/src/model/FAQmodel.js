const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
    header: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const FAQModel = model("faqs", DataSchema);
module.exports = FAQModel;
