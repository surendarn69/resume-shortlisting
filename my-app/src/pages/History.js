import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  // Logged-in user
  const email = localStorage.getItem("loggedInUser");
  const key = `analysisHistory_${email}`;

  // Load history
  useEffect(() => {
    if (!email) {
      navigate("/");
      return;
    }

    const storedHistory = JSON.parse(localStorage.getItem(key)) || [];
    setHistory(storedHistory);
  }, [email, key, navigate]);

  // Delete one
  const deleteOne = (id) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  // Clear all
  const clearAll = () => {
    if (window.confirm("Clear all history?")) {
      localStorage.removeItem(key);
      setHistory([]);
    }
  };

  // Submit to MongoDB
  const handleSubmitDetail = async (item) => {
    const payload = {
      email,
      candidateName: item.candidateName,
      jobTitle: item.jobTitle,
      status: item.shortlisted ? "Shortlisted" : "Rejected",
      requiredSkills: item.skills,
      matchedSkills: item.matchedSkills,
      matchPercentage: item.matchPercentage,
      date: item.date
    };

    try {
      const res = await fetch("https://resume-shortlisting-production.up.railway.app/save-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("History submitted to database ✅");
      } else {
        alert("Failed to submit history");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/Analyze")} style={styles.backBtn}>
          ← Back
        </button>

        <h1 style={styles.title}>Analysis History</h1>

        {history.length > 0 && (
          <button onClick={clearAll} style={styles.clearBtn}>
            Clear All
          </button>
        )}
      </div>

      {/* Empty */}
      {history.length === 0 && (
        <p style={styles.empty}>No analysis history found.</p>
      )}

      {/* Cards */}
      {history.map(item => (
        <div

          key={item.id}
          style={{
            ...styles.card,
            borderColor: item.shortlisted ? "#22c55e" : "#ef4444",
            background: item.shortlisted
              ? "rgba(34,197,94,0.12)"
              : "rgba(239,68,68,0.12)"
          }}
        >
           <p style={{ 
      fontWeight: "600", 
      color: "#38bdf8", 
      fontSize: "0.9rem",
      marginBottom: "0.25rem"
    }}>
      👤 Candidate: {item.candidateName || "Unknown Candidate"}
    </p>
          <div style={styles.cardTop}>
            <h3 style={styles.job}>{item.jobTitle}</h3>
            <span
              style={{
                ...styles.badge,
                background: item.shortlisted ? "#22c55e" : "#ef4444"
              }}
            >
              {item.shortlisted ? "Shortlisted" : "Rejected"}
            </span>
          </div>

          <p><b>Required Skills:</b> {item.skills || "—"}</p>
          <p><b>Matched Skills:</b> {item.matchedSkills?.join(", ") || "None"}</p>

          <p style={styles.percent}>
            Match Percentage: {item.matchPercentage}%
          </p>

          <div style={styles.footer}>
            <small>{item.date}</small>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => handleSubmitDetail(item)}
                style={styles.submitBtn}
              >
                Submit
              </button>

              <button
                onClick={() => deleteOne(item.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #0f172a, #020617)",
    color: "white",
    padding: "2rem",
    fontFamily: "system-ui"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700"
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#38bdf8",
    cursor: "pointer"
  },
  clearBtn: {
    background: "#ef4444",
    border: "none",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    cursor: "pointer"
  },
  empty: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: "4rem"
  },
  card: {
    border: "1px solid",
    borderRadius: "0.75rem",
    padding: "1.25rem",
    marginBottom: "1.25rem"
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem"
  },
  job: {
    fontSize: "1.25rem",
    fontWeight: "600"
  },
  badge: {
    padding: "0.25rem 0.75rem",
    borderRadius: "1rem",
    fontSize: "0.75rem",
    color: "white"
  },
  percent: {
    fontWeight: "600",
    marginTop: "0.5rem"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem"
  },
  submitBtn: {
    background: "#22c55e",
    border: "none",
    color: "white",
    padding: "0.35rem 0.75rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.75rem"
  },
  deleteBtn: {
    background: "transparent",
    border: "1px solid #ef4444",
    color: "#ef4444",
    padding: "0.35rem 0.75rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.75rem"
  }
};

export default History;

