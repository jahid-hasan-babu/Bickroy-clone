const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const AuthVerification = require("../middleware/AuthVerification");

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

module.exports = router;
