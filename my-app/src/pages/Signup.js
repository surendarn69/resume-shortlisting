import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Briefcase,
  Users,
  FileSearch,
  User,
  Mail,
  Lock,
  Key,
} from "lucide-react";

function Signup() {
  // ✅ STATES (THIS FIXES fullName ERROR)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

    const handleSendOTP = async () => {
    if (!email) return alert("Enter your email first");

    try {
      const res = await fetch("https://resume-backend-k0qm.onrender.com/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  // ✅ SIGNUP FUNCTION (CONNECTED TO BACKEND)
  const handleSignup = async () => {
  if (!email || !password || !otp) {
    return alert("All fields are required"); // Only check email, password, otp
  }

  const res = await fetch("https://resume-backend-k0qm.onrender.com/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, otp }),
  });

  const data = await res.json();
  alert(data.message);

  if (res.ok) {
    navigate("/login");
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

      {/* Right Side - Signup Form */}
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
              Create your account
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#94a3b8',
              margin: 0
            }}>
              Start screening candidates with AI
            </p>
          </div>

          {/* Full Name Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.25rem',
                height: '1.25rem',
                color: '#64748b'
              }} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
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
                placeholder="Create a password"
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

          {/* OTP Section */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              OTP Verification
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Key style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.25rem',
                  height: '1.25rem',
                  color: '#64748b'
                }} />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
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
              <button
                onClick={handleSendOTP}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'rgba(20, 184, 166, 0.2)',
                  border: '1px solid #14b8a6',
                  borderRadius: '0.5rem',
                  color: '#14b8a6',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.2)';
                }}
              >
                Send OTP
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSignup}
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
            Create Account
          </button>

          {/* Sign In Link */}
          <p style={{
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '0.875rem',
            margin: 0
          }}>
            Already have an account?{' '}
            <a
              href="/login"
              style={{
                color: '#14b8a6',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Sign in
            </a>
          </p>

          {/* Footer Note */}
          <p style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: '0.75rem',
            marginTop: '2rem',
            marginBottom: 0
          }}>
            HR professionals only. Secure OTP authentication.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;