import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const res = await axios.get("http://localhost:5000/api/reports/summary");
    setSummary(res.data);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 32, margin: '2em auto', maxWidth: 950 }}>
      <h2 style={{ color: '#2b7a3b', marginBottom: 18, fontSize: '2em' }}>Reports</h2>
      {summary ? (
        <div>
          <h3 style={{ color: '#1b2b3a', marginTop: 18 }}>By Department</h3>
          <ul style={{ listStyle: 'disc inside', marginBottom: 12, paddingLeft: 0 }}>
            {summary.byDept.map((d) => <li key={d._id} style={{ background: '#fff', marginBottom: 6, padding: '8px 12px', borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>{d._id}: {d.count}</li>)}
          </ul>

          <h3 style={{ color: '#1b2b3a', marginTop: 18 }}>By Year</h3>
          <ul style={{ listStyle: 'disc inside', marginBottom: 12, paddingLeft: 0 }}>
            {summary.byYear.map((y) => <li key={y._id} style={{ background: '#fff', marginBottom: 6, padding: '8px 12px', borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>{y._id}: {y.count}</li>)}
          </ul>

          <h3 style={{ color: '#1b2b3a', marginTop: 18 }}>By Counsellor</h3>
          <ul style={{ listStyle: 'disc inside', marginBottom: 12, paddingLeft: 0 }}>
            {summary.byCounsellor.map((c) => <li key={c._id} style={{ background: '#fff', marginBottom: 6, padding: '8px 12px', borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>{c._id}: {c.count}</li>)}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Reports;
