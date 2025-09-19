import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to the Student Support System</h1>
      <div style={{ marginTop: "50px" }}>
        <button
          onClick={() => navigate("/student")}
          style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
        >
          Student
        </button>
        <button
          onClick={() => navigate("/volunteer")}
          style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
        >
          Volunteer
        </button>
        <button
          onClick={() => navigate("/counsellor")}
          style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
        >
          Counsellor
        </button>
      </div>
    </div>
  );
}

export default HomePage;
