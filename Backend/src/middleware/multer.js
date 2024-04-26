const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({ storage: storage }).single("image"); // Ensure that 'image' matches the field name in the frontend

module.exports = upload;
