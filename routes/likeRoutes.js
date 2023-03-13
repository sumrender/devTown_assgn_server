const express = require("express");
const isAuthorized = require("../middlewares/authMiddleware");
const { createLike, deleteLike } = require("../controllers/likeController");
const router = express.Router();

router.use(isAuthorized);
router.post("/:id", createLike);
router.delete("/:id", deleteLike);

module.exports = router;
