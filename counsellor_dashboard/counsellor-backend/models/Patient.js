const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  dept: String,
  year: String,
  counsellor: String,
  issue: String,
  notes: String,
  dateOfCounselling: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", patientSchema);
