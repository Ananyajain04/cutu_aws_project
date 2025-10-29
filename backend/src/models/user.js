const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },  // ✅ replaces "username"
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  dob: { type: Date, required: true },
  role: { type: String, enum: ['user','mod','admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
