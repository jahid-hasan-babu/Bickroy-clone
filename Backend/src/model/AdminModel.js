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
    password: {
      type: String,
      validate: {
        validator: function (v) {
          // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a strong password!`,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const AdminModel = model("admins", DataSchema);
module.exports = AdminModel;
