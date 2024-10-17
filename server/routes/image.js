const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  getUserImages,
  incrementViewCount,
  fetchImageById,
  fetchAllImages,
} = require("../controller/image.controller");
const auth = require("../middleware/auth");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Image Upload Route
router.post(
  "/upload",
  auth,
  upload.single("avatar"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    next();
  },
  uploadImage
);
router.get("/user/:userId", auth, getUserImages);
router.get("/all", auth, fetchAllImages);
router.post("/:id/view", auth, incrementViewCount);
router.get("/:id", auth, fetchImageById);

module.exports = router;
