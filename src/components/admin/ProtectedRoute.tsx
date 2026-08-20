import React from 'react'
import { Navigate } from 'react-router-dom'
import { adminPath } from '../../config/env'
import { useAdmin } from '../../contexts/AdminContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to={adminPath('login')} replace />
}

export default ProtectedRoute

