import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { useAdmin } from '../../contexts/AdminContext'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAdmin()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin' },
    { name: 'Products', icon: '💎', path: '/admin/products' },
    { name: 'Categories', icon: '📂', path: '/admin/categories' },
    { name: 'Orders', icon: '📦', path: '/admin/orders' },
    { name: 'Settings', icon: '⚙️', path: '/admin/settings' }
  ]

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Manivra Jewels" className="sidebar-logo" />
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="nav-item"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.displayName?.charAt(0) || 'A'}
            </div>
            <div className="user-details">
              <p className="user-name">{user?.displayName || 'Admin'}</p>
              <p className="user-role">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="page-title">Manivra Jewels Admin</h1>
          <div className="top-bar-actions">
            <a href="/" className="view-site-btn" target="_blank" rel="noopener noreferrer">
              View Site
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <style>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: var(--color-bg-light);
        }

        .sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 1000;
          transition: transform 0.3s ease;
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid var(--color-border);
          text-align: center;
        }

        .sidebar-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          margin-bottom: 1rem;
        }

        .sidebar-header h2 {
          color: var(--color-navy);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          color: var(--color-text);
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          background: var(--color-bg-light);
          color: var(--color-gold);
          border-left-color: var(--color-gold);
        }

        .nav-icon {
          font-size: 1.25rem;
          margin-right: 1rem;
          width: 24px;
          text-align: center;
        }

        .nav-text {
          font-weight: 500;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--color-border);
        }

        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: var(--color-gold);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-right: 0.75rem;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          color: var(--color-text);
          margin: 0 0 0.25rem 0;
          font-size: 0.875rem;
        }

        .user-role {
          color: var(--color-text-secondary);
          margin: 0;
          font-size: 0.75rem;
        }

        .logout-btn {
          width: 100%;
          background: var(--color-danger);
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: #c33;
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
        }

        .top-bar {
          background: white;
          border-bottom: 1px solid var(--color-border);
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background 0.3s ease;
        }

        .menu-toggle:hover {
          background: var(--color-bg-light);
        }

        .page-title {
          color: var(--color-navy);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .top-bar-actions {
          display: flex;
          gap: 1rem;
        }

        .view-site-btn {
          background: var(--color-gold);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .view-site-btn:hover {
          background: var(--color-gold-dark);
          transform: translateY(-1px);
        }

        .page-content {
          flex: 1;
          padding: 2rem;
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0;
          }

          .menu-toggle {
            display: block;
          }

          .sidebar-overlay {
            display: block;
          }

          .page-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminLayout
