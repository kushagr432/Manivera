import React, { useEffect, useState } from 'react'
import { adminPath } from '../../config/env'
import { getCategories, getOrders, getProducts } from '../../firebase/services'
import { AdminStats, Order, Product } from '../../types/admin'

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0
  })
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      const [products, categories, orders] = await Promise.all([
        getProducts(),
        getCategories(),
        getOrders()
      ])

      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
      const pendingOrders = orders.filter(order => order.status === 'pending').length

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalOrders: orders.length,
        pendingOrders,
        totalRevenue
      })

      // Get recent products (last 5)
      setRecentProducts(products.slice(0, 5))

      // Get recent orders (last 5)
      setRecentOrders(orders.slice(0, 5))

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard: React.FC<{
    title: string
    value: string | number
    icon: string
    color: string
    change?: string
  }> = ({ title, value, icon, color, change }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
        {change && <span className="stat-change">{change}</span>}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your jewelry business.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon="💎"
          color="#4F46E5"
        />
        <StatCard
          title="Categories"
          value={stats.totalCategories}
          icon="📂"
          color="#059669"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="📦"
          color="#DC2626"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon="⏳"
          color="#D97706"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon="💰"
          color="#7C3AED"
        />
      </div>

      <div className="dashboard-content">
        {/* Recent Products */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Products</h2>
            <a href={adminPath('products')} className="view-all-link">View All</a>
          </div>
          
          {recentProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products yet. <a href={adminPath('products')}>Add your first product</a></p>
            </div>
          ) : (
            <div className="products-list">
              {recentProducts.map(product => (
                <div key={product.id} className="product-item">
                  <img src={product.image} alt={product.name} className="product-thumb" />
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">₹{product.price.toLocaleString()}</p>
                  </div>
                  <div className="product-status">
                    {product.featured && <span className="featured-badge">Featured</span>}
                    {!product.inStock && <span className="out-of-stock-badge">Out of Stock</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <a href={adminPath('orders')} className="view-all-link">View All</a>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="empty-state">
              <p>No orders yet. Orders will appear here when customers contact you via WhatsApp.</p>
            </div>
          ) : (
            <div className="orders-list">
              {recentOrders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <h4>{order.customerName}</h4>
                    <p className="order-email">{order.customerEmail}</p>
                    <p className="order-amount">₹{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge status-${order.status}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <a href={adminPath('products')} className="action-card">
            <div className="action-icon">💎</div>
            <h3>Add Product</h3>
            <p>Add a new jewelry piece to your collection</p>
          </a>
          
          <a href={adminPath('categories')} className="action-card">
            <div className="action-icon">📂</div>
            <h3>Manage Categories</h3>
            <p>Organize your products into categories</p>
          </a>
          
          <a href={adminPath('orders')} className="action-card">
            <div className="action-icon">📦</div>
            <h3>View Orders</h3>
            <p>Check customer inquiries and orders</p>
          </a>
          
          <a href="/" className="action-card" target="_blank" rel="noopener noreferrer">
            <div className="action-icon">👁️</div>
            <h3>View Website</h3>
            <p>See how your website looks to customers</p>
          </a>
        </div>
      </div>

      <style>{`
        .admin-dashboard {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-loading {
          text-align: center;
          padding: 4rem 2rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--color-border);
          border-top: 4px solid var(--color-gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          color: var(--color-navy);
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .dashboard-header p {
          color: var(--color-text-secondary);
          font-size: 1.125rem;
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          color: var(--color-navy);
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }

        .stat-title {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
        }

        .stat-change {
          color: var(--color-success);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .dashboard-section {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--color-border);
        }

        .section-header h2 {
          color: var(--color-navy);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }

        .view-all-link {
          color: var(--color-gold);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .view-all-link:hover {
          text-decoration: underline;
        }

        .empty-state {
          text-align: center;
          padding: 2rem;
          color: var(--color-text-secondary);
        }

        .empty-state a {
          color: var(--color-gold);
          text-decoration: none;
        }

        .empty-state a:hover {
          text-decoration: underline;
        }

        .products-list,
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .product-item,
        .order-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .product-item:hover,
        .order-item:hover {
          background: var(--color-bg-light);
        }

        .product-thumb {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .product-details,
        .order-info {
          flex: 1;
        }

        .product-details h4,
        .order-info h4 {
          color: var(--color-navy);
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
        }

        .product-category,
        .order-email {
          color: var(--color-text-secondary);
          font-size: 0.75rem;
          margin: 0 0 0.25rem 0;
        }

        .product-price,
        .order-amount {
          color: var(--color-gold);
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0;
        }

        .product-status,
        .order-status {
          text-align: right;
        }

        .featured-badge,
        .out-of-stock-badge,
        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .featured-badge {
          background: var(--color-gold);
          color: white;
        }

        .out-of-stock-badge {
          background: var(--color-danger);
          color: white;
        }

        .status-badge {
          background: var(--color-bg-light);
          color: var(--color-text);
        }

        .status-pending {
          background: #FEF3C7;
          color: #92400E;
        }

        .status-confirmed {
          background: #D1FAE5;
          color: #065F46;
        }

        .status-shipped {
          background: #DBEAFE;
          color: #1E40AF;
        }

        .status-delivered {
          background: #D1FAE5;
          color: #065F46;
        }

        .status-cancelled {
          background: #FEE2E2;
          color: #991B1B;
        }

        .order-date {
          color: var(--color-text-secondary);
          font-size: 0.75rem;
          margin: 0;
        }

        .quick-actions {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .quick-actions h2 {
          color: var(--color-navy);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 1.5rem 0;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.5rem;
          border: 2px solid var(--color-border);
          border-radius: 0.75rem;
          text-decoration: none;
          color: var(--color-text);
          transition: all 0.3s ease;
        }

        .action-card:hover {
          border-color: var(--color-gold);
          background: rgba(212, 175, 55, 0.05);
          transform: translateY(-2px);
        }

        .action-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .action-card h3 {
          color: var(--color-navy);
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .action-card p {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
