const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  type: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
    default: 'user',
  },
}, {
  timestamps: true,
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
