const express = require("express");
const router = express.Router();
const Tracker = require("../Database/tracker");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/tracker", authMiddleware, async (req, res) => {
  try {
    const { transport, electricity, plastic, totalCO2, ecoScore} = req.body;

    if (!transport || !electricity || !plastic || totalCO2 === null || ecoScore === null) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const tracker = new Tracker({
      user: req.user._id,
      email: req.user.email,
      transport,
      electricity,
      plastic,
      totalCO2,
      ecoScore
    });

    await tracker.save();

    res.status(201).json({
      success: true,
      message: "Eco data saved successfully",
      data: tracker,
    });
  } catch (err) {
    console.error("Tracker Save Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/tracker", authMiddleware, async (req, res) => {
  try {
    const data = await Tracker.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Tracker Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
