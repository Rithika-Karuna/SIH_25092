const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  volunteerId: String,
  name: String,
  handledStudDept: String,
  handledStudYear: String,
  counsellor: String,
  notes: String,
  dateOfCounselling: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
