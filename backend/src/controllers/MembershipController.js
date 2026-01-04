const User = require("../models/userModel.js");

// 📝 Submit Membership Form
const submitMembershipForm = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      age,
      gender,
      status, // ✅ Civil Status
      homeAddress,
      emailAddress,
      mobile,
      gradeLevel,
      course,
      schoolName,
      occupation,
      officeCompany,
      membershipId,
      batchName,
      beltRank,
      emergencyContactPerson,
      relationship,
      emergencyContactNumber,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Save uploaded image path (consistent with multer destination)
    const image = req.file
      ? `/profileimage/${req.file.filename}`
      : user.membershipForm?.image || null;

    user.membershipForm = {
      fullName,
      dateOfBirth,
      age,
      gender,
      status,
      homeAddress,
      emailAddress,
      mobile,
      gradeLevel,
      course,
      schoolName,
      occupation,
      officeCompany,
      membershipId,
      batchName,
      beltRank,
      emergencyContactPerson,
      relationship,
      emergencyContactNumber,
      image,
      submittedAt: new Date(),
    };

    user.verificationStatus = "pending";
    user.role = "user";

    await user.save();

    res.status(200).json({
      message: "Membership form submitted. Waiting for admin approval.",
      user,
    });
  } catch (err) {
    console.error("❌ Submit membership form error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin: Verify Member (only if still pending)
const verifyMember = async (req, res) => {
  try {
    const { userId } = req.params;
    const { verificationStatus } = req.body;

    const allowedStatuses = ["verified", "rejected"];
    if (!verificationStatus || !allowedStatuses.includes(verificationStatus)) {
      return res.status(400).json({ message: "Invalid verification status" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verificationStatus !== "pending") {
      return res.status(400).json({
        message: `User already ${user.verificationStatus}, cannot change.`,
      });
    }

    user.verificationStatus = verificationStatus;
    if (verificationStatus === "verified") {
      user.role = "member";
    }

    await user.save();

    res.status(200).json({
      message: `User has been ${verificationStatus}`,
      user,
    });
  } catch (err) {
    console.error("❌ Verify member error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all pending members
const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ verificationStatus: "pending" });
    res.status(200).json({ users });
  } catch (err) {
    console.error("❌ Get pending users error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 👀 Admin: View All Verified Members
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" });
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Get all users error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 📝 Update Personal Info (only for verified members)
const updateInfo = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      age,
      gender,
      status, // ✅ Civil Status
      homeAddress,
      emailAddress,
      mobile,
      gradeLevel,
      course,
      schoolName,
      occupation,
      officeCompany,
      membershipId,
      batchName,
      beltRank,
      emergencyContactPerson,
      relationship,
      emergencyContactNumber,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verificationStatus !== "verified") {
      return res
        .status(403)
        .json({ message: "Only verified members can update their info" });
    }

    let image = user.membershipForm?.image;
    if (req.file) {
      image = `/profileimage/${req.file.filename}`;
    }

    user.membershipForm = {
      ...user.membershipForm.toObject(),
      fullName: fullName || user.membershipForm?.fullName,
      dateOfBirth: dateOfBirth || user.membershipForm?.dateOfBirth,
      age: age || user.membershipForm?.age,
      gender: gender || user.membershipForm?.gender,
      status: status || user.membershipForm?.status,
      homeAddress: homeAddress || user.membershipForm?.homeAddress,
      emailAddress: emailAddress || user.membershipForm?.emailAddress,
      mobile: mobile || user.membershipForm?.mobile,
      gradeLevel: gradeLevel || user.membershipForm?.gradeLevel,
      course: course || user.membershipForm?.course,
      schoolName: schoolName || user.membershipForm?.schoolName,
      occupation: occupation || user.membershipForm?.occupation,
      officeCompany: officeCompany || user.membershipForm?.officeCompany,
      membershipId: membershipId || user.membershipForm?.membershipId,
      batchName: batchName || user.membershipForm?.batchName,
      beltRank: beltRank || user.membershipForm?.beltRank,
      emergencyContactPerson:
        emergencyContactPerson || user.membershipForm?.emergencyContactPerson,
      relationship: relationship || user.membershipForm?.relationship,
      emergencyContactNumber:
        emergencyContactNumber || user.membershipForm?.emergencyContactNumber,
      image,
      updatedAt: new Date(),
    };

    await user.save();

    res.status(200).json({
      message: "Personal info updated successfully",
      user,
    });
  } catch (err) {
    console.error("❌ Update info error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin: Update Any Member Info
const updateMemberByAdmin = async (req, res) => {
  try {
    const { userId } = req.params; // admin chooses which user
    const {
      fullName,
      dateOfBirth,
      age,
      gender,
      status,
      homeAddress,
      emailAddress,
      mobile,
      gradeLevel,
      course,
      schoolName,
      occupation,
      officeCompany,
      membershipId,
      batchName,
      beltRank,
      emergencyContactPerson,
      relationship,
      emergencyContactNumber,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let image = user.membershipForm?.image;
    if (req.file) {
      image = `/profileimage/${req.file.filename}`;
    }

    user.membershipForm = {
      ...user.membershipForm.toObject(),
      fullName: fullName || user.membershipForm?.fullName,
      dateOfBirth: dateOfBirth || user.membershipForm?.dateOfBirth,
      age: age || user.membershipForm?.age,
      gender: gender || user.membershipForm?.gender,
      status: status || user.membershipForm?.status,
      homeAddress: homeAddress || user.membershipForm?.homeAddress,
      emailAddress: emailAddress || user.membershipForm?.emailAddress,
      mobile: mobile || user.membershipForm?.mobile,
      gradeLevel: gradeLevel || user.membershipForm?.gradeLevel,
      course: course || user.membershipForm?.course,
      schoolName: schoolName || user.membershipForm?.schoolName,
      occupation: occupation || user.membershipForm?.occupation,
      officeCompany: officeCompany || user.membershipForm?.officeCompany,
      membershipId: membershipId || user.membershipForm?.membershipId,
      batchName: batchName || user.membershipForm?.batchName,
      beltRank: beltRank || user.membershipForm?.beltRank,
      emergencyContactPerson:
        emergencyContactPerson || user.membershipForm?.emergencyContactPerson,
      relationship: relationship || user.membershipForm?.relationship,
      emergencyContactNumber:
        emergencyContactNumber || user.membershipForm?.emergencyContactNumber,
      image,
      updatedAt: new Date(),
    };

    await user.save();

    res.status(200).json({
      message: "Member info updated successfully by admin",
      user,
    });
  } catch (err) {
    console.error("❌ Admin update member error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Members per belt
const getBeltStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $match: { "membershipForm.beltRank": { $exists: true, $ne: null } } },
      { $group: { _id: "$membershipForm.beltRank", count: { $sum: 1 } } },
      { $project: { belt: "$_id", count: 1, _id: 0 } },
      { $sort: { belt: 1 } }
    ]);

    // Map bucket IDs to nice labels
    const labeledStats = stats.map((item) => {
      let label = "";
      switch (item._id) {
        case 0: label = "0-9"; break;
        case 10: label = "10-15"; break;
        case 16: label = "16-20"; break;
        case 21: label = "21-25"; break;
        case 26: label = "26-30"; break;
        case 31: label = "31+"; break;
        default: label = "Other";
      }
      return { age: label, count: item.count };
    });

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch belt stats" });
  }
};

// Members per batch
const getBatchStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $match: { "membershipForm.batchName": { $exists: true, $ne: null } } },
      { $group: { _id: "$membershipForm.batchName", count: { $sum: 1 } } },
      { $project: { batch: "$_id", count: 1, _id: 0 } },
      { $sort: { batch: 1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch batch stats" });
  }
};

// Members per age group
const getAgeStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $match: { "membershipForm.age": { $exists: true, $ne: null } } },
      {
        $bucket: {
          groupBy: "$membershipForm.age",
          boundaries: [0, 10, 16, 21, 26, 31, 100], // age groups
          default: "Other",
          output: { count: { $sum: 1 } }
        }
      },
      { $project: { age: "$_id", count: 1, _id: 0 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch age stats" });
  }
};

// ✅ Users by verification status
const getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: "$verificationStatus",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    // Make sure we always return both verified & unverified (even if 0)
    const allStatuses = ["verified", "pending", "rejected"];
    const result = allStatuses.map((s) => {
      const found = stats.find((item) => item.status === s);
      return { status: s, count: found ? found.count : 0 };
    });

    res.json(result);
  } catch (err) {
    console.error("❌ Get user stats error:", err);
    res.status(500).json({ error: "Failed to fetch user stats" });
  }
};


module.exports = {
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
};

