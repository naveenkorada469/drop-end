const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bloodGroup: String,
  city: String,
  role: {
    type: String,
    default: "donor"
  },
  profilePic: String
});

module.exports = mongoose.model("User", userSchema);