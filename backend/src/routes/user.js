// routes/user.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth.js");

// GET /api/user/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("fullName email dob role");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/user/search?name=Taylor
router.get("/search", authMiddleware, async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Name query required" });

  try {
    const users = await User.find({
      fullname: { $regex: name, $options: "i" }, // case-insensitive search
    }).select("fullname role createdAt _id");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/user/:id
router.get("/:id", authMiddleware, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
