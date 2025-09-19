require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Patient = require("./models/Patient");
const Volunteer = require("./models/Volunteer");

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// --- Patients CRUD ---
app.get("/api/patients", async (req, res) => {
  try {
    const q = {};
    if (req.query.studentId) q.studentId = req.query.studentId;
    if (req.query.dept) q.dept = req.query.dept;
    if (req.query.year) q.year = req.query.year;
    if (req.query.counsellor) q.counsellor = req.query.counsellor;

    if (req.query.from || req.query.to) {
      q.dateOfCounselling = {};
      if (req.query.from) q.dateOfCounselling.$gte = new Date(req.query.from);
      if (req.query.to) q.dateOfCounselling.$lte = new Date(req.query.to);
    }

    const patients = await Patient.find(q).sort({ dateOfCounselling: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/patients", async (req, res) => {
  try {
    const p = new Patient(req.body);
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/patients/:id", async (req, res) => {
  try {
    const p = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/patients/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Volunteers CRUD ---
app.get("/api/volunteers", async (req, res) => {
  try {
    const q = {};
    if (req.query.volunteerId) q.volunteerId = req.query.volunteerId;
    if (req.query.handledStudDept) q.handledStudDept = req.query.handledStudDept;
    if (req.query.handledStudYear) q.handledStudYear = req.query.handledStudYear;
    if (req.query.counsellor) q.counsellor = req.query.counsellor;

    if (req.query.from || req.query.to) {
      q.dateOfCounselling = {};
      if (req.query.from) q.dateOfCounselling.$gte = new Date(req.query.from);
      if (req.query.to) q.dateOfCounselling.$lte = new Date(req.query.to);
    }

    const arr = await Volunteer.find(q).sort({ dateOfCounselling: -1 });
    res.json(arr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/volunteers", async (req, res) => {
  try {
    const v = new Volunteer(req.body);
    await v.save();
    res.json(v);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/volunteers/:id", async (req, res) => {
  try {
    const v = await Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(v);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/volunteers/:id", async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Reports ---
app.get("/api/reports/summary", async (req, res) => {
  try {
    const patients = await Patient.aggregate([{ $group: { _id: "$dept", count: { $sum: 1 } } }]);
    const byYear = await Patient.aggregate([{ $group: { _id: "$year", count: { $sum: 1 } } }]);
    const byCounsellor = await Patient.aggregate([{ $group: { _id: "$counsellor", count: { $sum: 1 } } }]);

    res.json({ byDept: patients, byYear, byCounsellor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/reports", async (req, res) => {
  try {
    const { type, value, from, to } = req.query;
    const match = {};

    if (from || to) {
      match.dateOfCounselling = {};
      if (from) match.dateOfCounselling.$gte = new Date(from);
      if (to) match.dateOfCounselling.$lte = new Date(to);
    }

    if (type === "counsellor" && value) match.counsellor = value;
    if (type === "student" && value) match.studentId = value;
    if (type === "dept" && value) match.dept = value;
    if (type === "year" && value) match.year = value;

    const list = await Patient.find(match).sort({ dateOfCounselling: -1 });
    res.json({ results: list, total: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
