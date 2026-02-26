const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Auth = require("./controllers/auth");
const Tracker = require("./controllers/tracker");
const Badge = require("./controllers/badges");
const Contact = require("./controllers/contact");
const Newsletter = require("./controllers/newsletter");
const Port = process.env.PORT || 3000;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "To many requests, please try again",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


//Routes
app.use("/api/auth", Auth, limiter);
app.use("/api", Tracker, limiter);
app.use("/api", Badge, limiter);
app.use("/api", Contact, limiter);
app.use("/api", Newsletter, limiter);

// Mongoose connect
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("✅✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌❌ Error connecting MongoDB:", err);
    process.exit(1);
  });

// Bind to 0.0.0.0, not localhost
app.listen(7860, () => {
  console.log(`Server running on port 7860`);
});
