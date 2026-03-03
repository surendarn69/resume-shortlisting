import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  // 🔹 Stats state
  const [totalSessions, setTotalSessions] = useState(0);
  const [resumesAnalyzed, setResumesAnalyzed] = useState(0);
  const [shortlistedCount, setShortlistedCount] = useState(0);

  // 🔹 Load stats (per logged-in user)
  useEffect(() => {
    const email = localStorage.getItem("loggedInUser");
    if (!email) {
      navigate("/");
      return;
    }

    const key = `analysisHistory_${email}`;
    const history = JSON.parse(localStorage.getItem(key)) || [];

    setTotalSessions(history.length);
    setResumesAnalyzed(history.length);

    const shortlisted = history.filter(
      item => item.shortlisted === true
    ).length;

    setShortlistedCount(shortlisted);
  }, [navigate]);

  const handleNewSession = () => {
    navigate('/Analyze');
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            backgroundColor: '#10b981',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            Resume Shortlist AI
          </h1>
        </div>

        <button
          onClick={handleLogout}
          style={{
            color: '#94a3b8',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: '3rem 2rem' }}>
        {/* Welcome Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '3rem'
        }}>
          <div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.5rem', margin: 0 }}>
              Welcome back
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.125rem', margin: 0 }}>
              Manage your resume screening sessions
            </p>
          </div>

          <button
            onClick={handleNewSession}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>+</span>
            New Session
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <StatCard value={totalSessions} label="Total Sessions" />
          <StatCard value={resumesAnalyzed} label="Resumes Analyzed" />
          <StatCard value={shortlistedCount} label="Candidates Shortlisted" />
        </div>

        {/* 🔥 SAME UI — JUST CLICKABLE */}
        <div
          onClick={() => navigate("/history")}
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #334155',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "#10b981"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "#334155"}
        >
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Session History
          </h3>
          <p style={{ color: '#94a3b8' }}>
            Click to view your analysis history
          </p>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ value, label }) => (
  <div style={{
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    border: '1px solid #334155',
    borderRadius: '0.75rem',
    padding: '1.5rem'
  }}>
    <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
      {value}
    </div>
    <div style={{ color: '#94a3b8' }}>{label}</div>
  </div>
);

export default Main;
