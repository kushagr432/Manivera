import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { useAdmin } from '../../contexts/AdminContext'

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAdmin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Manivra Jewels" className="login-logo" />
          <h1>Admin Panel</h1>
          <p>Sign in to manage your jewelry collection</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
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
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Manivra Jewels Admin Portal</p>
        </div>
      </div>

      <style>{`
        .admin-login {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-dark) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-container {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .login-header {
          margin-bottom: 2rem;
        }

        .login-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 1rem;
        }

        .login-header h1 {
          color: var(--color-navy);
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .login-header p {
          color: var(--color-text-secondary);
          font-size: 1rem;
        }

        .login-form {
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

        .btn-login {
          width: 100%;
          background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
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

        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        }

        .btn-login:disabled {
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

        .login-footer {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border);
        }

        .login-footer p {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 2rem;
            margin: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminLogin
