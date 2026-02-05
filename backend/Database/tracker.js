const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    transport: { type: String, required: true },
    electricity: { type: String, required: true },
    plastic: { type: String, required: true },
    totalCO2: { type: Number, required: true },
    ecoScore: { type: Number, required: true },
  },
  { timestamps: true } 
);
trackerSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

module.exports = mongoose.model("Tracker", trackerSchema);
