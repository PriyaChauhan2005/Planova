const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true, // Prevents duplicate student entries
  },
  email: {
    type: String,
    required: true,
  },
  streak: {
    type: Number,
    default: 0,
  },
  lastStreakUpdate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);