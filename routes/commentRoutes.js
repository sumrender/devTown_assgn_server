const express = require("express");
const isAuthorized = require("../middlewares/authMiddleware");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

// unprotected routes
// router.get("/", getAllComments);

// protector
router.use(isAuthorized);

// protected routes
router.post("/:id", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
