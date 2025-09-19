import React, { useState } from "react";
import "./Registration.css";

function CounsellorRegistration() {
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
        {/* Left Side with Image */}
        <div className="form-image"></div>

        {/* Right Side with Form */}
 <div className="form-content">
          <h2>Counselor Registration</h2>
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

            {/* Counselor ID */}
  <label htmlFor="counselorId">Counselor ID</label>
            <input
              type="text"
              id="counselorId"
              placeholder="Enter counselor ID"
              required
            />

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

export default CounsellorRegistration;