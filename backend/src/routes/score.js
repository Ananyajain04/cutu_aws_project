const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");
const authMiddleware = require("../middleware/auth");

// POST score for a guessed word
router.post("/", authMiddleware, async (req, res) => {
  const { word, attempts } = req.body;

  if (!word || !attempts) {
    return res.status(400).json({ error: "Missing word or attempts" });
  }

  try {
    const entry = await Leaderboard.create({
      user: req.user._id,
      word,
      attempts,
    });

    const populated = await entry.populate("user", "fullName");
    console.log("score submitted: ",entry);
    res.json(populated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET leaderboard for a specific word
router.get("/:word", async (req, res) => {
  try {
    const scores = await Leaderboard.find({ word: req.params.word })
      .sort({ attempts: 1 })
      .limit(10)
      .populate("user", "fullName");

    res.json(scores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
