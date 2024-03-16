const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
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
    brandID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    edition: {
      type: String,
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
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    img4: { type: String, required: true },
    img5: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
