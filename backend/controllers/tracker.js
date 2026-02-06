const express = require("express");
const router = express.Router();
const Tracker = require("../Database/tracker");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/tracker", authMiddleware, async (req, res) => {
  try {
    const { transport, electricity, plastic, totalCO2, ecoScore } = req.body;

    if (
      !transport ||
      !electricity ||
      !plastic ||
      totalCO2 === null ||
      ecoScore === null
    ) {
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
      ecoScore,
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

router.get("/leaderboard-tracker", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const leaderboard = await Tracker.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: "$user",
          totalEcoScore: { $sum: "$ecoScore" },
          totalCO2: { $sum: "$totalCO2" },
          entries: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          email: "$userInfo.email",
          totalEcoScore: 1,
          totalCO2: 1,
          entries: 1,
        },
      },
      { $sort: { totalEcoScore: -1 } },
      {
        $setWindowFields: {
          sortBy: { totalEcoScore: -1 },
          output: { rank: { $rank: {} } },
        },
      },
      { $limit: 10 },
    ]);

    res.status(200).json({ success: true, leaderboard });
  } catch (err) {
    console.error("Leaderboard Fetch Failed", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
