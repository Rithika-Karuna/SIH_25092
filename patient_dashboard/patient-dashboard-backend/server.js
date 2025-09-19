const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Activity = require("./models/Activity");
const app = express();
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));
// Routes
app.get("/activities", async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});
app.post("/activities", async (req, res) => {
  const { name, count, date, time } = req.body;
  const newActivity = new Activity({ name, count, date, time });
  await newActivity.save();
  res.json(newActivity);
});
app.put("/activities/:id/appreciate", async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  if (!activity) return res.status(404).json({ message: "Not found" });
  activity.count += 1;
  await activity.save();
  res.json(activity);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));