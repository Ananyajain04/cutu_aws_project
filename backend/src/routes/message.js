// GET /api/messages/:album
const express = require("express");
const router = express.Router();
const Message = require("../models/message.js");
const authMiddleware = require("../middleware/auth");

router.get("/:album", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ album: req.params.album })
      .sort({ createdAt: 1 })
      .populate("sender", "fullName"); // populate sender's fullname
      console.log(messages);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { album, text } = req.body;

    // Create and save new message
    const message = new Message({
      album,
      sender: req.user._id, // logged-in user's ObjectId
      text,
    });

    await message.save();

    // Optionally populate sender before sending back
    await message.populate("sender", "fullName");

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
