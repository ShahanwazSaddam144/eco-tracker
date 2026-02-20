const express = require("express");
const router = express.Router();
const Newsletter = require("../Database/newsletter");

router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already subscribed" });
    }

    const newNewsLetter = new Newsletter({ email });
    await newNewsLetter.save();

    return res.status(200).json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});


module.exports = router;
