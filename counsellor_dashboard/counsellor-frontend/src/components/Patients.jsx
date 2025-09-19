import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/patients";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", studentId: "", dept: "", year: "", counsellor: "", issue: "" });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await axios.get(API_URL);
    setPatients(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ name: "", studentId: "", dept: "", year: "", counsellor: "", issue: "" });
    fetchPatients();
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 32, margin: '2em auto', maxWidth: 950 }}>
      <h2 style={{ color: '#2b7a3b', marginBottom: 18, fontSize: '2em' }}>Patient Details</h2>
      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, minWidth: 120 }}
          />
        ))}
        <button type="submit" style={{ padding: '10px 18px', border: 'none', background: '#2b7a3b', color: '#fff', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Add Patient</button>
      </form>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', marginTop: 10 }}>
        <thead>
          <tr>
            <th style={{ padding: 12, border: '1px solid #e0e0e0', background: '#f4f6f8' }}>Name</th>
            <th style={{ padding: 12, border: '1px solid #e0e0e0', background: '#f4f6f8' }}>Student ID</th>
            <th style={{ padding: 12, border: '1px solid #e0e0e0', background: '#f4f6f8' }}>Dept</th>
            <th style={{ padding: 12, border: '1px solid #e0e0e0', background: '#f4f6f8' }}>Year</th>
            <th style={{ padding: 12, border: '1px solid #e0e0e0', background: '#f4f6f8' }}>Counsellor</th>
            <th style={{ padding: 12, border: '1px solid #e0e0e0', background: '#f4f6f8' }}>Issue</th>
            <th style={{ padding: 12, border: '1px solid #e0e0e0', background: '#f4f6f8' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td style={{ padding: 10, border: '1px solid #e0e0e0' }}>{p.name}</td>
              <td style={{ padding: 10, border: '1px solid #e0e0e0' }}>{p.studentId}</td>
              <td style={{ padding: 10, border: '1px solid #e0e0e0' }}>{p.dept}</td>
              <td style={{ padding: 10, border: '1px solid #e0e0e0' }}>{p.year}</td>
              <td style={{ padding: 10, border: '1px solid #e0e0e0' }}>{p.counsellor}</td>
              <td style={{ padding: 10, border: '1px solid #e0e0e0' }}>{p.issue}</td>
              <td style={{ padding: 10, border: '1px solid #e0e0e0' }}>{new Date(p.dateOfCounselling).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;
