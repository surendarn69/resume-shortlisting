import { FileText, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login'); // navigate to Login page
  };

  const handleGetStarted = () => {
    navigate('/signup'); // navigate to Signup page
  };

  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #115e59)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid rgba(51, 65, 85, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            backgroundColor: '#14b8a6',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
          </div>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            Resume Shortlist AI
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={handleSignIn} // Navigate to Login
            style={{
              color: 'white',
              background: 'transparent',
              border: 'none',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = '#5eead4'}
            onMouseOut={(e) => e.target.style.color = 'white'}
          >
            Sign In
          </button>
          <button
            onClick={handleGetStarted} // Navigate to Signup
            style={{
              backgroundColor: '#14b8a6',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0d9488'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14b8a6'}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(19, 78, 74, 0.3)',
          border: '1px solid rgba(20, 184, 166, 0.3)',
          borderRadius: '9999px',
          padding: '0.5rem 1.25rem',
          marginBottom: '2rem'
        }}>
          <Sparkles style={{ width: '1rem', height: '1rem', color: '#5eead4' }} />
          <span style={{ color: '#5eead4', fontSize: '0.875rem', fontWeight: '500' }}>
            AI-Powered Resume Screening
          </span>
        </div>

        {/* Main Heading */}
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '1.5rem',
          maxWidth: '80rem',
          lineHeight: '1.2',
          margin: '0 0 1.5rem 0'
        }}>
          Find your <span style={{ color: '#5eead4' }}>ideal candidates</span> in seconds, not hours
        </h2>

        {/* Subheading */}
        <p style={{
          color: '#cbd5e1',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '48rem',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Upload resumes, describe your job requirements, and let our AI analyze, rank, and shortlist the best candidates automatically.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={handleSignIn} // Navigate to Login
            style={{
              backgroundColor: '#14b8a6',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '1.125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#0d9488';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(20, 184, 166, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#14b8a6';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
          >
            Sign In
          </button>
          <button
            onClick={handleGetStarted} // Navigate to Signup
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #475569',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '1.125rem',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#64748b'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#475569'}
          >
            Get Started
          </button>
        </div>
      </main>

      {/* Watermark */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        color: '#64748b',
        fontSize: '0.875rem'
      }}>
        Activate Windows
      </div>
    </div>
  );
}

export default Landing;
