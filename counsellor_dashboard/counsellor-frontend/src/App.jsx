
import Patients from "./components/Patients";
import Volunteers from "./components/Volunteers";
import Reports from "./components/Reports";
import { useState } from "react";

function App() {
  const [page, setPage] = useState('home');
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f8' }}>
      {page === 'home' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '2.5em', color: '#2b7a3b', marginBottom: 40 }}>Counsellor Dashboard</h1>
          <div style={{ display: 'flex', gap: 32 }}>
            <button
              onClick={() => setPage('patients')}
              style={{ background: '#2b7a3b', color: '#fff', border: 'none', borderRadius: 10, padding: '32px 48px', fontSize: '1.3em', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
            >
              Patient Dashboard
            </button>
            <button
              onClick={() => setPage('volunteers')}
              style={{ background: '#1b2b3a', color: '#fff', border: 'none', borderRadius: 10, padding: '32px 48px', fontSize: '1.3em', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
            >
              Volunteer Dashboard
            </button>
            <button
              onClick={() => setPage('report')}
              style={{ background: '#fff', color: '#2b7a3b', border: '2px solid #2b7a3b', borderRadius: 10, padding: '32px 48px', fontSize: '1.3em', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
            >
              View Report
            </button>
          </div>
        </div>
      )}
      {page === 'patients' && (
        <>
          <div style={{ padding: '1.5em 0 0 2em' }}>
            <button onClick={() => setPage('home')} style={{ background: 'none', color: '#2b7a3b', border: 'none', fontWeight: 600, fontSize: '1.1em', cursor: 'pointer', marginBottom: 16 }}>&larr; Back</button>
          </div>
          <Patients />
        </>
      )}
      {page === 'volunteers' && (
        <>
          <div style={{ padding: '1.5em 0 0 2em' }}>
            <button onClick={() => setPage('home')} style={{ background: 'none', color: '#1b2b3a', border: 'none', fontWeight: 600, fontSize: '1.1em', cursor: 'pointer', marginBottom: 16 }}>&larr; Back</button>
          </div>
          <Volunteers />
        </>
      )}
      {page === 'report' && (
        <>
          <div style={{ padding: '1.5em 0 0 2em' }}>
            <button onClick={() => setPage('home')} style={{ background: 'none', color: '#2b7a3b', border: 'none', fontWeight: 600, fontSize: '1.1em', cursor: 'pointer', marginBottom: 16 }}>&larr; Back</button>
          </div>
          <Reports />
        </>
      )}
    </div>
  );
}

export default App;
