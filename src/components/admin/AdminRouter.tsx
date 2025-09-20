import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import AdminDashboard from './AdminDashboard'
import AdminLayout from './AdminLayout'
import AdminLogin from './AdminLogin'
import CloudinaryPresetTest from './CloudinaryPresetTest'
import CloudinaryTest from './CloudinaryTest'
import FirebaseTest from './FirebaseTest'
import ProductList from './ProductList'

const AdminRouter: React.FC = () => {
  console.log('AdminRouter rendering...')
  
  const { isAuthenticated, loading } = useAdmin()
  
  console.log('Admin state:', { isAuthenticated, loading })

  if (loading) {
    console.log('Showing loading state')
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
        <style>{`
          .admin-loading {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-dark) 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .admin-loading p {
            font-size: 1.125rem;
            margin: 0;
          }
        `}</style>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log('Showing login form')
    return (
      <div>
        <AdminLogin />
        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Don't have an admin account yet?
          </p>
          <a 
            href="/admin/setup" 
            style={{ 
              color: 'var(--color-gold)', 
              textDecoration: 'none',
              fontWeight: '600',
              padding: '0.5rem 1rem',
              border: '2px solid var(--color-gold)',
              borderRadius: '0.5rem',
              display: 'inline-block'
            }}
          >
            Create Admin Account
          </a>
        </div>
      </div>
    )
  }

  console.log('Showing admin layout')
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/test" element={<FirebaseTest />} />
        <Route path="/cloudinary-test" element={<CloudinaryTest />} />
        <Route path="/preset-test" element={<CloudinaryPresetTest />} />
        <Route path="/categories" element={<div>Categories - Coming Soon</div>} />
        <Route path="/orders" element={<div>Orders - Coming Soon</div>} />
        <Route path="/settings" element={<div>Settings - Coming Soon</div>} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminRouter
