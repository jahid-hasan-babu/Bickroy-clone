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
const SubCategoryController = require("../controller/SubcategoryController");
const SubBrandController = require("../controller/SubBrandsController");
const SubLocationController = require("../controller/SubLocationController");
const SliderController = require("../controller/SliderController");
const AboutController = require("../controller/AboutController");
const FAQController = require("../controller/FAQController");
const SellFastController = require("../controller/SellFastController");
const MembershipController = require("../controller/MemberShipController");

//users
router.get("/login/:email", UserController.login);
router.get("/verifyLogin/:email/:otp", UserController.verifyLogin);
router.get("/logout", AuthVerification, UserController.UserLogout);
router.get("/read-profile", AuthVerification, UserController.readProfile);
router.post("/create-user", AuthVerification, UserController.createUser);
router.post("/update-profile", AuthVerification, UserController.UpdateProfile);
router.delete(
  "/delete-profile",
  AuthVerification,
  UserController.deleteProfile
);
router.get("/read-user", UserController.reaAllUser);

//adds
router.post("/create-add", AuthVerification, AddsController.createAdd);
//read all adds public
router.get("/read-adds", AddsController.readAllAdds);
router.get("/read-add-details/:addID", AddsController.readAddByID);

//read all adds for user who create
router.get("/read-user-add", AuthVerification, AddsController.readUserAdd);
router.get(
  "/read-user-addByID/:addId",
  AuthVerification,
  AddsController.readUserAddOne
);

router.get("/searchByKeyword/:Keyword", AddsController.searchByKeyword);
router.patch(
  "/update-user-add/:addId",
  AuthVerification,
  AddsController.updateUserAdd
);

router.delete(
  "/delete-user-add/:addId",
  AuthVerification,
  AddsController.deleteAddByUser
);

//admin
router.post("/create-admin", AdminController.createAdmin); //this route use only one time
router.get("/login-admin/:email/:password", AdminController.adminLogin);
router.patch("/update-admin", AdminVerification, AdminController.updateAdmin);
router.put("/approveAdd/:adId", AdminController.approveAdmin);
router.delete("/delete-add-admin/:addId", AddsController.deleteAdds);
router.delete("/delete-userByAdmin/:userId", AdminController.deleteUserByAdmin);
//category
router.post(
  "/create-category",
  AdminVerification,
  CategoryController.createCategory
);
router.get("/category-list", CategoryController.allCategory);
router.get(
  "/category-list-ByRemark/:Remark",
  CategoryController.CategoryListRemark
);

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

//subCategory
router.post(
  "/create-subCategory",
  AdminVerification,
  SubCategoryController.createSubCategory
);

router.get("/subCategory-list", SubCategoryController.readAll);
router.patch(
  "/update-subCategory/:id",
  AdminVerification,
  SubCategoryController.updateCategory
);

router.delete(
  "/delete-subCategory/:id",
  AdminVerification,
  SubCategoryController.deleteCategory
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

// sub brands
router.post(
  "/create-subBrand",
  AdminVerification,
  SubBrandController.createSubBrand
);

router.get("/subBrands-list", SubBrandController.readSubBrand);
router.patch(
  "/update-SubBrand/:id",
  AdminVerification,
  SubBrandController.updateSubBrand
);

router.delete(
  "/delete-subBrand/:id",
  AdminVerification,
  SubBrandController.deleteSubBrand
);

//location
router.post(
  "/create-location",
  AdminVerification,
  LocationController.createLocation
);
router.get("/location-list", LocationController.readAllLocation);

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

//sub location
router.post(
  "/create-subLocation",
  AdminVerification,
  SubLocationController.createSubLocation
);

router.get("/subLocation-list", SubLocationController.readAllSubLocation);
router.patch(
  "/update-subLocation/:id",
  AdminVerification,
  SubLocationController.updateSubLocation
);

router.delete(
  "/delete-subLocation/:id",
  AdminVerification,
  SubLocationController.deleteSubLocation
);
// slider
router.post("/create-slider", AdminVerification, SliderController.createSlider);
router.get("/slider-list", SliderController.readAllSlider);
router.patch(
  "/update-slider/:id",
  AdminVerification,
  SliderController.updateSlider
);

router.delete(
  "/delete-slider/:id",
  AdminVerification,
  SliderController.deleteSlider
);

//About us
router.post("/create-aboutUs", AdminVerification, AboutController.createAbout);
router.get("/read-aboutUs", AboutController.readAbout);
router.patch(
  "/update-aboutUs/:id",
  AdminVerification,
  AboutController.updateAbout
);

router.delete(
  "/delete-aboutUs/:id",
  AdminVerification,
  AboutController.updateAbout
);
//FAQ
router.post("/create-FAQ", AdminVerification, FAQController.createFAQ);
router.get("/read-FAQ", FAQController.readFAQ);
router.patch("/update-FAQ/:id", AdminVerification, FAQController.updateFAQ);
router.delete("/delete-FAQ/:id", AdminVerification, FAQController.deleteFAQ);

//sell fast
router.post(
  "/create-sellFast",
  AdminVerification,
  SellFastController.createSell
);

router.get("/read-sellFast", SellFastController.readSell);
router.patch(
  "/update-sellFast/:id",
  AdminVerification,
  SellFastController.updateSell
);

router.delete(
  "/delete-sellFast/:id",
  AdminVerification,
  SellFastController.deleteSell
);
//membership
router.post(
  "/create-membership",
  AdminVerification,
  MembershipController.createMembership
);

router.get("/read-membership", MembershipController.readMembership);
router.patch(
  "/update-membership/:id",
  AdminVerification,
  MembershipController.updateMembership
);

router.delete(
  "/delete-membership/:id",
  AdminVerification,
  MembershipController.deleteMembership
);

module.exports = router;
