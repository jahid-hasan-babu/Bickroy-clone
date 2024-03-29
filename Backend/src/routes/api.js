const express = require("express");
const router = express.Router();
const AuthVerification = require("../middleware/AuthVerification");
const UserController = require("../controller/UserController");
const AddsController = require("../controller/AddsController");
const AdminController = require("../controller/AdminController");
const AdminVerification = require("../middleware/AdminVerification");
const CategoryController = require("../controller/CategoryController");
const BrandsController = require("../controller/BrandsController");
const LocationController = require("../controller/LocationController");

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

//category
router.post(
  "/create-category",
  AdminVerification,
  CategoryController.createCategory
);
router.get("/category-list", CategoryController.allCategory);
router.patch(
  "/update-category/:id",
  AdminVerification,
  CategoryController.updateCategory
);

router.delete(
  "/delete-category/:id",
  AdminVerification,
  CategoryController.deleteCategory
);

//Brands
router.post("/create-brand", AdminVerification, BrandsController.createBrand);
router.get("/brand-list", BrandsController.readAll);
router.patch(
  "/update-brand/:id",
  AdminVerification,
  BrandsController.updateBrand
);

router.delete(
  "/delete-brand/:id",
  AdminVerification,
  BrandsController.deleteBrand
);

//location
router.post(
  "/create-location",
  AdminVerification,
  LocationController.createLocation
);
router.get(
  "/location-list",
  AdminVerification,
  LocationController.readAllLocation
);

router.patch(
  "/update-location/:id",
  AdminVerification,
  LocationController.updateLocation
);

router.delete(
  "/delete-location/:id",
  AdminVerification,
  LocationController.deleteLocation
);
module.exports = router;
