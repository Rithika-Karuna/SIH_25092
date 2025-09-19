const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Activity", ActivitySchema);
