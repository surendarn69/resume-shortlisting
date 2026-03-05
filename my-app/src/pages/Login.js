import { useState } from 'react';
import { FileText, Briefcase, Users, FileSearch, Mail, Lock } from 'lucide-react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async () => {
    const res = await fetch("https://resume-backend-k0qm.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("loggedInUser", email);
      navigate("/main");
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #134e4a, #1e293b, #1e3a8a)',
      display: 'flex',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Left Side - Features */}
      <div style={{
        flex: 1,
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        color: 'white'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '4rem' }}>
          <FileText style={{ width: '2rem', height: '2rem', color: '#14b8a6' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            Resume Shortlist AI
          </h1>
        </div>

        {/* Main Heading */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            lineHeight: '1.2',
            margin: 0,
            marginBottom: '1.5rem'
          }}>
            Find the <span style={{ color: '#14b8a6' }}>perfect candidates</span> with AI-powered screening
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#94a3b8',
            lineHeight: '1.8',
            margin: 0
          }}>
            Upload resumes, describe your requirements, and let our AI analyze and rank candidates instantly.
          </p>
        </div>

        {/* Features List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Feature 1 */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: 'rgba(20, 184, 166, 0.1)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Briefcase style={{ width: '1.5rem', height: '1.5rem', color: '#14b8a6' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                Smart Job Matching
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>
                AI analyzes resumes against your job description
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: 'rgba(20, 184, 166, 0.1)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Users style={{ width: '1.5rem', height: '1.5rem', color: '#14b8a6' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                Ranked Candidates
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>
                Get instant rankings with match scores
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: 'rgba(20, 184, 166, 0.1)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FileSearch style={{ width: '1.5rem', height: '1.5rem', color: '#14b8a6' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                Detailed Insights
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>
                View strengths, skills, and recommendations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        width: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '3rem',
          width: '100%',
          maxWidth: '480px',
          border: '1px solid rgba(71, 85, 105, 0.3)'
        }}>
          {/* Form Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 0.5rem 0'
            }}>
              Welcome back
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#94a3b8',
              margin: 0
            }}>
              Sign in to your account
            </p>
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.25rem',
                height: '1.25rem',
                color: '#64748b'
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hr@company.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(71, 85, 105, 0.5)'}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.25rem',
                height: '1.25rem',
                color: '#64748b'
              }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(71, 85, 105, 0.5)'}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: '#14b8a6',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginBottom: '1.5rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0d9488'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14b8a6'}
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <p style={{
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '0.875rem',
            margin: 0
          }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#14b8a6',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Sign up
            </Link>
          </p>

          {/* Footer Note */}
          <p style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: '0.75rem',
            marginTop: '2rem',
            marginBottom: 0
          }}>
            HR professionals only. Secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;