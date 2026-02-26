const express = require("express");
const User = require("../Database/auth");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/sendEmail");
const { authMiddleware } = require("../middleware/authMiddleware");

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


router.post("/signin", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      tokens: [],
    });

    const verifyToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    newUser.verifyToken = verifyToken;

    await newUser.save();

    const verifyUrl = `https://wahb-amir-eco-tracker.hf.space/api/auth/verify/${verifyToken}`;
    sendVerificationEmail(newUser.email, newUser.name, verifyUrl).catch((err) =>
      console.log("Email not sent:", err)
    );

    res.status(201).json({
      success: true,
      message: "Account created! Please check your email to verify your account.",
      token: verifyToken,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id, verifyToken: token });
    if (!user) return res.status(400).send("Invalid or expired token");

    user.isVerified = true;
    user.verifyToken = null;
    await user.save();

    res.send("<h2>Email verified successfully! You can now log in.</h2>");
  } catch (err) {
    res.status(400).send("Verification link expired or invalid");
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(401).json({ message: "Please verify your email before logging in" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    user.tokens.push({ token });
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/me", authMiddleware, async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      name: req.user.name,
      email: req.user.email,
      isVerified: req.user.isVerified,
    },
  });
});


router.post("/logout", authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
    await req.user.save();

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Logout failed" });
  }
});


router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.error("Delete Account Error:", err);
    res.status(500).json({ message: "Failed to delete account" });
  }
});

module.exports = router;
