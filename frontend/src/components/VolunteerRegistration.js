import React, { useState } from "react";
import "./Registration.css";

function VolunteerRegistration() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <div className="form-box">
        {/* Registration Form */}
        <div className="form-content">
          <h2>Volunteer Registration</h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />

            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />

            {/* Password */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
            />

            {/* Department */}
            <label for="department">Department</label>
    <select id="department" required>
      <option value="">-- Select Department --</option>
      <optgroup label="Engineering & Technology">
        <option value="CSE">Computer Science</option>
        <option value="AI_DS">Artificial Intelligence & Data Science</option>
<option value="AI_ML">Artificial Intelligence & Machine Learning</option>
        <option value="IT">Information Technology</option>
        <option value="ECE">Electronics & Communication</option>
        <option value="EEE">Electrical Engineering</option>
        <option value="MECH">Mechanical Engineering</option>
        <option value="CIVIL">Civil Engineering</option>
      </optgroup>
      <optgroup label="Science">
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Mathematics">Mathematics</option>
        <option value="Biology">Biology</option>
        <option value="Biotechnology">Biotechnology</option>
        <option value="Microbiology">Microbiology</option>
        <option value="EnvironmentalScience">Environmental Science</option>
      </optgroup>
      <optgroup label="Arts & Humanities">
        <option value="English">English Literature</option>
        <option value="History">History</option>
        <option value="Psychology">Psychology</option>
        <option value="Sociology">Sociology</option>
        <option value="PoliticalScience">Political Science</option>
        <option value="Philosophy">Philosophy</option>
        <option value="Economics">Economics</option>
      </optgroup>
      <optgroup label="Commerce & Management">
 <option value="BCom">B.Com</option>
        <option value="MCom">M.Com</option>
        <option value="BBA">BBA</option>
        <option value="MBA">MBA</option>
        <option value="Accounting">Accounting & Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="HR">Human Resource Management</option>
      </optgroup>
      <optgroup label="Medical & Health Sciences">
        <option value="MBBS">MBBS</option>
        <option value="BDS">Dentistry</option>
        <option value="Nursing">Nursing</option>
        <option value="Pharmacy">Pharmacy</option>
        <option value="Physiotherapy">Physiotherapy</option>
        <option value="PublicHealth">Public Health</option>
      </optgroup>
      <optgroup label="Others">
        <option value="Law">Law</option>
        <option value="Education">Education (B.Ed / M.Ed)</option>
        <option value="FineArts">Fine Arts</option>
        <option value="Music">Music</option>
        <option value="Others">Others</option>
      </optgroup>
    </select>
            {/* Year of Study */}
            <label htmlFor="year">Year of Study</label>
            <select id="year" required>
<option value="">-- Select Year --</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="PG">Postgraduate</option>
              <option value="PhD">PhD</option>
            </select>

            {/* Register Button */}
            <button type="submit" className="Register-btn">
              Register
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Modal Alert */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>✅ Registration Successful!</h3>
            <p>Your details have been submitted.</p>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
 </div>
      )}
    </div>
  );
}

export default VolunteerRegistration;