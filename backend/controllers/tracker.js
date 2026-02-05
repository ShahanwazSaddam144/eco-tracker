const express = require("express");
const router = express.Router();
const Tracker = require("../Database/tracker");

router.post("/tracker", async (req, res) => {
  try {
    const { transport, electricity, plastic } = req.body;

    if (!transport || !electricity || !plastic) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newTracker = new Tracker({
      transport,
      electricity,
      plastic,
    });

    await newTracker.save();

    res.status(201).json({
      success: true,
      message: "Eco data submitted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
