const express = require("express");
const router = express.Router();
const AuthVerification = require("../middleware/AuthVerification");
const UserController = require("../controller/UserController");
const AddsController = require("../controller/AddsController");
const AdminController = require("../controller/AdminController");
const AdminVerification = require("../middleware/AdminVerification");

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
//read all adds public
router.get("/read-adds", AddsController.readAllAdds);
//read all adds for user who create
router.get("/read-user-add", AuthVerification, AddsController.readUserAdd);
router.delete(
  "/delete-user-add/:addId",
  AuthVerification,
  AddsController.deleteAddByUser
);

//admin
router.post("/create-admin", AdminController.createAdmin); //this route use only one time
router.get("/login-admin/:email/:password", AdminController.adminLogin);
router.patch("/update-admin", AdminVerification, AdminController.updateAdmin);

module.exports = router;
