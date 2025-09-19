import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import StudentRegistration from "./components/StudentRegistration";
import StudentLogin from "./components/StudentLogin";
import VolunteerRegistration from "./components/VolunteerRegistration";
import VolunteerLogin from "./components/VolunteerLogin";
import CounsellorRegistration from "./components/CounsellorRegistration";
import CounsellorLogin from "./components/CounsellorLogin.js";
import StudentDashboard from "./components/StudentDashboard";
import VolunteerDashboard from "./components/VolunteerDashboard";
import CounsellorDashboard from "./components/CounsellorDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentRegistration />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Volunteer Routes */}
        <Route path="/volunteer" element={<VolunteerRegistration />} />
        <Route path="/volunteer/login" element={<VolunteerLogin />} />
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />

        {/* Counsellor Routes */}
        <Route path="/counsellor" element={<CounsellorRegistration />} />
        <Route path="/counsellor/login" element={<CounsellorLogin />} />
        <Route path="/counsellor/dashboard" element={<CounsellorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
