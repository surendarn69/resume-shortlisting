import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Analyze = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [cutOffMark, setCutOffMark] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cgpa, setCgpa] = useState('');
  const [tenth, setTenth] = useState('');
  const [twelfth, setTwelfth] = useState('');


  const handleBackToDashboard = () => {
    navigate('/main');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setUploadedFiles(prev => [...prev, ...fileArray]);
  };

const handleAnalyzeResumes = async () => {
  if (!jobTitle || !jobDescription) {
    alert("Please fill in Job Title and Job Description");
    return;
  }

  if (uploadedFiles.length === 0) {
    alert("Please upload at least one resume");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);

    // ✅ USE USER INPUT
    formData.append("skills", additionalRequirements);

    formData.append("cutOffMark", cutOffMark);
    formData.append("cgpa", cgpa);
    formData.append("tenth", tenth);
    formData.append("twelfth", twelfth);

    // only first resume
    uploadedFiles.forEach(file => {
  formData.append("resume", file);
});

    const response = await fetch("https://resume-shortlisting-production.up.railway.app/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResults(data);
   const email = localStorage.getItem("loggedInUser");
const key = `analysisHistory_${email}`;

const history = JSON.parse(localStorage.getItem(key)) || [];

// ✅ LOOP — because data is ARRAY now
data.forEach(candidate => {

  history.unshift({
    id: Date.now() + Math.random(),

    candidateName: candidate.candidate_name,
    jobTitle,
    skills: additionalRequirements,

    matchPercentage: candidate.final_score,
    shortlisted: candidate.shortlisted,
    matchedSkills: candidate.matched_skills,

    date: new Date().toLocaleString()
  });

});

localStorage.setItem(key, JSON.stringify(history));



  } catch (error) {
    console.error(error);
    alert("Resume analysis failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{
      minHeight: '100vh',
      position: "relative",
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
        <button
      onClick={() => navigate("/history")}
      style={{
        position: "absolute",
        top: "1.5rem",
        right: "2rem",
        backgroundColor: "rgba(15,23,42,0.8)",
        color: "#14b8a6",
        border: "1px solid #14b8a6",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        zIndex: 10
      }}
    >
      📜 History
    </button>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }

          .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .pulse-icon {
            animation: pulse 2s ease-in-out infinite;
          }

          .shimmer-effect {
            background: linear-gradient(
              90deg,
              rgba(20, 184, 166, 0.1) 0%,
              rgba(20, 184, 166, 0.3) 50%,
              rgba(20, 184, 166, 0.1) 100%
            );
            background-size: 1000px 100%;
            animation: shimmer 3s linear infinite;
          }

          .hover-scale {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .hover-scale:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(20, 184, 166, 0.2);
          }

          .file-item-enter {
            animation: fadeInUp 0.3s ease-out forwards;
          }
        `}
      </style>

      {/* Back to Dashboard Button */}
      <button
        onClick={handleBackToDashboard}
        className="fade-in-up"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.875rem',
          marginBottom: '2rem',
          transition: 'color 0.3s',
          animationDelay: '0.1s',
          opacity: 0
        }}
        onMouseOver={(e) => e.currentTarget.style.color = '#14b8a6'}
        onMouseOut={(e) => e.currentTarget.style.color = 'white'}
      >
        <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      {/* Main Container */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div className="fade-in-up" style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          animationDelay: '0.2s',
          opacity: 0
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#14b8a6',
            fontSize: '0.875rem',
            marginBottom: '1rem'
          }}>
            <svg className="pulse-icon" style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="shimmer-effect" style={{ 
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontWeight: '500'
            }}>
              AI-Powered Analysis
            </span>
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: '0 0 0.5rem 0'
          }}>
            Create New Screening Session
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '1rem',
            margin: 0
          }}>
            Upload resumes and describe your requirements
          </p>
        </div>

        {/* Job Details Section */}
        <div className="fade-in-up hover-scale" style={{
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #334155',
          borderRadius: '0.75rem',
          padding: '2rem',
          marginBottom: '1.5rem',
          animationDelay: '0.3s',
          opacity: 0
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#14b8a6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Job Details</h2>
          </div>

          {/* Job Title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Job Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#14b8a6';
                e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Job Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Job Description <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={6}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#14b8a6';
                e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Additional Requirements */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Additional Requirements (Optional)
            </label>
            <textarea
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              placeholder="Specific skills, years of experience, certifications, etc..."
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#14b8a6';
                e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Academic Qualifications - Three Fields in a Row */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Academic Qualifications (Optional)
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem'
            }}>
              {/* CGPA */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  marginBottom: '0.25rem',
                  color: '#94a3b8'
                }}>
                  CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="e.g., 8.5"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid #334155',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#14b8a6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#334155';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* 10th */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  marginBottom: '0.25rem',
                  color: '#94a3b8'
                }}>
                  10th %
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={tenth}
                  onChange={(e) => setTenth(e.target.value)}
                  placeholder="e.g., 85"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid #334155',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#14b8a6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#334155';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* 12th */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  marginBottom: '0.25rem',
                  color: '#94a3b8'
                }}>
                  12th %
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={twelfth}
                  onChange={(e) => setTwelfth(e.target.value)}
                  placeholder="e.g., 90"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid #334155',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#14b8a6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#334155';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Cut Off Mark */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Cut Off Mark
            </label>
            <input
              type="number"
              value={cutOffMark}
              onChange={(e) => setCutOffMark(e.target.value)}
              placeholder="e.g., 70"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#14b8a6';
                e.target.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Upload Resumes Section */}
        <div className="fade-in-up hover-scale" style={{
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #334155',
          borderRadius: '0.75rem',
          padding: '2rem',
          marginBottom: '2rem',
          animationDelay: '0.4s',
          opacity: 0
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#14b8a6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Upload Resumes</h2>
          </div>

          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragActive ? '#14b8a6' : '#334155'}`,
              borderRadius: '0.75rem',
              padding: '3rem 2rem',
              textAlign: 'center',
              backgroundColor: dragActive ? 'rgba(20, 184, 166, 0.05)' : 'rgba(15, 23, 42, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: dragActive ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            <input
              type="file"
              name="resume" 
              id="fileInput"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'block' }}>
              <svg style={{
                width: '3rem',
                height: '3rem',
                color: '#14b8a6',
                margin: '0 auto 1rem',
                transition: 'transform 0.3s ease'
              }} 
              className={dragActive ? 'pulse-icon' : ''}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                margin: '0 0 0.5rem 0'
              }}>
                Drag & drop resumes here
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: '#94a3b8',
                margin: 0
              }}>
                or click to browse multiple files (PDF, DOC, DOCX, TXT - max 10MB each)
              </p>
            </label>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#94a3b8',
                marginBottom: '0.5rem'
              }}>
                {uploadedFiles.length} file(s) uploaded
              </p>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="file-item-enter" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem',
                  border: '1px solid transparent',
                  transition: 'all 0.3s ease',
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#14b8a6';
                  e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
                }}
                >
                  <span style={{ fontSize: '0.875rem' }}>{file.name}</span>
                  <button
                    onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyzeResumes}
          className="fade-in-up"
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#14b8a6',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            animationDelay: '0.5s',
            opacity: 0,
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0d9488';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(20, 184, 166, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#14b8a6';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Analyze Resumes
        </button>
        {loading && (
  <p style={{ textAlign: "center", marginTop: "1rem" }}>
    Analyzing resume...
  </p>
)}

{results.length > 0 && results.map((res, index) => (

  <div
    key={index}
    style={{
      marginTop: "2rem",
      padding: "1.5rem",
      borderRadius: "0.75rem",
      backgroundColor: res.shortlisted
        ? "rgba(34,197,94,0.15)"
        : "rgba(239,68,68,0.15)",
      border: `1px solid ${
        res.shortlisted ? "#22c55e" : "#ef4444"
      }`
    }}
  >

    <h3>👤 Candidate Name: {res.candidate_name}</h3>

    <h3>
      {res.shortlisted
        ? "✅ Resume Shortlisted"
        : "❌ Resume Not Shortlisted"}
    </h3>

    <p>
  Skill Match: <b>{res.skill_match}%</b>
</p>

<p>
  JD Match: <b>{res.jd_match}%</b>
</p>

<p>
  Overall Score: <b>{res.final_score}%</b>
</p>
<p>
  Academics:{" "}
  {res.academic_status === "satisfied" && (
    <b style={{ color: "#22c55e" }}>100% (Satisfied)</b>
  )}

  {res.academic_status === "not_satisfied" && (
    <b style={{ color: "#ef4444" }}>Not Satisfied</b>
  )}

  {res.academic_status === "not_detected" && (
    <b style={{ color: "#facc15" }}>
      ⚠ Academic details not detected clearly
    </b>
  )}
</p>


    <p>Matched Skills:</p>

    {res.matched_skills?.length > 0 ? (
      <ul>
        {res.matched_skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    ) : (
      <p>No matching skills</p>
    )}

  </div>

))}



      </div>
    </div>
  );
};

export default Analyze;