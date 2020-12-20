const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxLength: 15,
    },
    password: {
      type: String,
    },
    ratio: {
      win: Number,
      tie: Number,
      loss: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
