const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    locationName: {
      type: String,
      trim: true,
      required: true,
    },
    subLocationName: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "User phone number required"],
    },
  },
  { timestamps: true, versionKey: false }
);

const ProfileModel = model("profiles", DataSchema);

module.exports = ProfileModel;
