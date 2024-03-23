const express = require("express");
const router = express.Router();
const AuthVerification = require("../middleware/AuthVerification");
const UserController = require("../controller/UserController");
const AddsController = require("../controller/AddsController");

//users
router.get("/login/:email", UserController.login);
router.get("/verifyLogin/:email/:otp", UserController.verifyLogin);
router.get("/logout", AuthVerification, UserController.UserLogout);
router.post("/create-user", AuthVerification, UserController.createUser);
router.post("/update-profile", AuthVerification, UserController.UpdateProfile);
router.delete(
  "/delete-profile",
  AuthVerification,
  UserController.deleteProfile
);

//adds
router.post("/create-adds", AuthVerification, AddsController.createAdd);
module.exports = router;
