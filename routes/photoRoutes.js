const express = require("express");
const isAuthorized = require("../middlewares/authMiddleware");
const {
  createPhoto,
  getAllPhotos,
  getPhotoById,
  updatePhoto,
  deletePhoto,
} = require("../controllers/photoController");
const router = express.Router();

// unprotected routes
router.get("/", getAllPhotos);
router.get("/:id", getPhotoById);

// protector
router.use(isAuthorized);

// protected routes
router.post("/", createPhoto);
router.put("/:id", updatePhoto);
router.delete("/:id", deletePhoto);

module.exports = router;
