const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  album: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // must have ref: "User"
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);
