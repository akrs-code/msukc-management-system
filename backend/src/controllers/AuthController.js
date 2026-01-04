import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔑 Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill out all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "An account with this email already exists. Please log in." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "You have successfully created an account. Please log in" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong while logging in. Please try again."});
  }
};

// 🔑 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill out all required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No account found with this email. Please sign up first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "The password you entered is incorrect." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token,
      name: user.name,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus, });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong while logging in. Please try again." });
  }
};

// 🔑 Logout
export const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
