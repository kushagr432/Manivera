import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebase/config'

const AdminSetup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      await createUserWithEmailAndPassword(auth, email, password)
      setMessage('Admin account created successfully! You can now login.')
      
      // Clear form
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      
    } catch (error: any) {
      console.error('Error creating admin:', error)
      setError(error.message || 'Failed to create admin account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-setup">
      <div className="setup-container">
        <div className="setup-header">
          <h1>Create Admin Account</h1>
          <p>Set up your first admin account for Manivra Jewels</p>
        </div>

        <form onSubmit={handleCreateAdmin} className="setup-form">
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@manivrajewels.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Minimum 6 characters"
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-create-admin"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Admin Account'}
          </button>
        </form>

        <div className="setup-footer">
          <p>After creating your account, you can login to the admin panel.</p>
          <a href="/admin" className="login-link">Go to Login</a>
        </div>
      </div>

      <style>{`
        .admin-setup {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-dark) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .setup-container {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .setup-header h1 {
          color: var(--color-navy);
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .setup-header p {
          color: var(--color-text-secondary);
          font-size: 1rem;
          margin: 0 0 2rem 0;
        }

        .setup-form {
          text-align: left;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          // display: block;
          color: var(--color-text);
          font-weight: 600;
          // margin-bottom: 0.5rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid var(--color-border);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .btn-create-admin {
          width: 100%;
          background: var(--color-gold);
          color: white;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .btn-create-admin:hover:not(:disabled) {
          background: var(--color-gold-dark);
          transform: translateY(-2px);
        }

        .btn-create-admin:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #fcc;
        }

        .success-message {
          background: #efe;
          color: #363;
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #cfc;
        }

        .setup-footer {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
        }

        .setup-footer p {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          margin: 0 0 1rem 0;
        }

        .login-link {
          color: var(--color-gold);
          text-decoration: none;
          font-weight: 600;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .setup-container {
            padding: 2rem;
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminSetup

