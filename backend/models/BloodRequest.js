const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  patientName: String,
  bloodGroup: String,
  hospital: String,
  city: String,
  contact: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("BloodRequest", requestSchema);