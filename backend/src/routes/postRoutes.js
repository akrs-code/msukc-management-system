const express = require("express");
const multer = require("multer");
const path = require("path");


const {
  createPost,
  getPosts,
  likePost,
  viewPost,
} = require("../controllers/PostController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Create post with image upload
router.post("/create", upload.single("image"),authMiddleware, createPost);
router.get("/show", authMiddleware, getPosts);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/view", authMiddleware, viewPost);

module.exports = router;
