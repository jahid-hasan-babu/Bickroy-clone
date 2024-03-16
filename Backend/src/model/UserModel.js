const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DataSchema = Schema(
  {
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, "User email required"],
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = model("users", DataSchema);

module.exports = UserModel;
