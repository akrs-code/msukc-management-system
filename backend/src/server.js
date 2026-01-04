const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const path = require("path"); 
const memberRoutes = require("./routes/memberRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

app.use('/profileimage', express.static(path.join(process.cwd(), 'src/profileimage')));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/membership", memberRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `✅ Connected to MongoDB and server running at http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
