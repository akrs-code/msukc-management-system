const express = require("express");
const multer = require("multer");
const path = require("path"); // ✅ Add missing import
const fs = require("fs"); // For directory creation
const {
  submitMembershipForm,
  verifyMember,
  getAllUsers,
  updateInfo,
  getPendingUsers,
  updateMemberByAdmin,
  getBeltStats, 
  getBatchStats, 
  getAgeStats,
  getUserStats
} = require("../controllers/MembershipController.js");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/profileimage/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });



// User submits membership form
router.patch("/submit", authMiddleware, upload.single("image"), submitMembershipForm);

// Admin verifies member
router.patch("/verify/:userId", authMiddleware, adminMiddleware, verifyMember);

// Admin views all users
router.get("/all", authMiddleware, adminMiddleware, getAllUsers);

// Update user information
router.patch("/update", authMiddleware, upload.single("image"), updateInfo);

// Get pending members
router.get("/pending", authMiddleware, adminMiddleware, getPendingUsers);

router.put("/admin/update/:userId", authMiddleware, adminMiddleware, updateMemberByAdmin);

router.get("/stats/belts", authMiddleware, adminMiddleware, getBeltStats);
router.get("/stats/batches", authMiddleware, adminMiddleware, getBatchStats);
router.get("/stats/ages", authMiddleware, adminMiddleware, getAgeStats);
router.get("/stats/users", authMiddleware, adminMiddleware, getUserStats);

module.exports = router;