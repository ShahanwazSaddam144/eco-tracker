const Contact = require("../Database/contact");
const express = require("express");
const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, inquiryType, message } = req.body;

    if (!name || !email || !inquiryType || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const newContact = new Contact({
      name,
      email,
      inquiryType,
      message,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact Submitted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
