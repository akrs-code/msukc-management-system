const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema({
  eventName: { type: String },
  date: { type: Date },
  category: { type: String },
  result: { type: String }, // Medal / Placement
});

const membershipFormSchema = new mongoose.Schema({
  // Personal Information
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  status: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed"],
    default: "Single",
  }, // ✅ Civil Status
  homeAddress: { type: String },
  emailAddress: { type: String }, // optional if different from login email
  mobile: { type: String },

  // Educational / Professional Background
  gradeLevel: { type: String }, // for students
  course: { type: String },
  schoolName: { type: String },
  occupation: { type: String }, // for professionals
  officeCompany: { type: String },

  // Membership Details
  membershipId: { type: String },
  batchName: { type: String },
  beltRank: { type: String }, // Kyu/Dan

  // Competitions
  competitions: [competitionSchema],

  // Emergency Info
  emergencyContactPerson: { type: String },
  relationship: { type: String },
  emergencyContactNumber: { type: String },

  // Attachments
  image: { type: String }, // ID photo
  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "admin", "member"],
      default: "user",
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected", "not_applied"],
      default: "not_applied",
    },

    membershipForm: membershipFormSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
