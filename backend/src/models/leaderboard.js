const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  word: { type: String, required: true },
  attempts: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
