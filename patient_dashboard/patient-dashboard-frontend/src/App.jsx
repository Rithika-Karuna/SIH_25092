import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/activities";

function App() {
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", time: "" });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const res = await axios.get(API_URL);
    setActivities(res.data);
  };

  const handleAdd = async () => {
    if (!form.name || !form.date || !form.time) return alert("Fill all fields");
    await axios.post(API_URL, { ...form, count: 1 });
    setForm({ name: "", date: "", time: "" });
    fetchActivities();
  };

  const handleAppreciate = async (id) => {
    await axios.put(`${API_URL}/${id}/appreciate`);
    fetchActivities();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Patient Dashboard</h1>
      <h2>Your Activities</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Activity Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <button onClick={handleAdd}>Add Activity</button>
      </div>

      <div style={styles.cardContainer}>
        {activities.map((act) => (
          <div key={act._id} style={styles.card}>
            <h3>{act.name}</h3>
            <p>Sessions: <b>{act.count}</b></p>
            <p>Date: {act.date}</p>
            <p>Time: {act.time}</p>
            <button style={styles.btn} onClick={() => handleAppreciate(act._id)}>
              Appreciate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",

    /* Center the whole page */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",      // horizontal centering
    justifyContent: "center",  // vertical centering
    textAlign: "center",
  },
  header: { marginBottom: "20px" },

  form: { 
    display: "flex", 
    gap: "10px", 
    margin: "20px 0",
    justifyContent: "center",  // keeps form inputs centered
    alignItems: "center" 
  },

  cardContainer: { 
    display: "flex", 
    gap: "20px", 
    flexWrap: "wrap",
    justifyContent: "center",  // keeps cards in the middle
    marginTop: "20px"
  },

  card: { 
    background: "#fff", 
    padding: "15px", 
    borderRadius: "10px", 
    width: "220px", 
    textAlign: "center", 
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)" 
  },

  btn: { 
    marginTop: "10px", 
    padding: "5px 10px", 
    border: "none", 
    borderRadius: "5px", 
    background: "#4CAF50", 
    color: "#fff", 
    cursor: "pointer" 
  }
};


export default App;
