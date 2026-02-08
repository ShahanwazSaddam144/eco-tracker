const express = require("express");
const router = express.Router();
const Badges = require("../Database/badges");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/badges", authMiddleware, async (req, res) => {
  try {
    const { title, description, unlocked } = req.body;

    if (!title || !description || unlocked !== true) {
      return res.status(400).json({
        success: false,
        message: "Invalid badge data",
      });
    }

    const alreadyExists = await Badges.findOne({
      user: req.user._id,
      title,
    });

    if (alreadyExists) {
      return res.status(200).json({
        success: true,
        message: "Badge already unlocked",
      });
    }

    const newBadge = new Badges({
      user: req.user._id,
      email: req.user.email,
      title,
      description,
      unlocked: true,
    });

    await newBadge.save();

    res.status(200).json({
      success: true,
      message: "Badge saved successfully",
      badge: newBadge,
    });
  } catch (err) {
    console.error("Badge Save Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
