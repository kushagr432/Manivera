import { useState } from 'react'
import { adminPath } from '../config/env'
import { useAdmin } from '../contexts/AdminContext'
import { deleteProduct, updateProduct } from '../firebase/services'
import { useFeaturedProducts } from '../hooks/useProducts'
import { Product } from '../types/admin'
import ProductDetailModal from './ProductDetailModal'

const FeaturedCollectionsFirebase = () => {
  const [activeCollection, setActiveCollection] = useState(0)
  const { products, loading, error } = useFeaturedProducts()
  const { isAuthenticated } = useAdmin()
  
  // State for edit modal and delete confirmation
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<Product>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // State for product detail modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)

  const collections = [
    {
      id: 1,
      name: "Diamond Collection",
      description: "Exquisite diamonds that capture every ray of light",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Diamond"
    },
    {
      id: 2,
      name: "Gold Collection",
      description: "Timeless elegance in precious gold",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Gold"
    },
    {
      id: 3,
      name: "Pearl Collection",
      description: "Natural beauty in lustrous pearls",
      image: "https://images.unsplash.com/photo-1596944924616-7b384a6b3a3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Pearl"
    }
  ]

  // Filter products by collection category
  const getCollectionProducts = (category: string) => {
    return products.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
    ).slice(0, 3) // Show max 3 products per collection
  }

  // Handle edit product
  // NOTE: the button that calls this is currently commented out in the product
  // card below, so TypeScript sees it as unused. Kept because the edit modal it
  // opens is still wired up. Remove the suppression when the button is restored.
  // @ts-ignore TS6133: entry point temporarily disabled in the UI
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      featured: product.featured
    })
    setShowEditModal(true)
  }

  // Handle update product
  const handleUpdateProduct = async () => {
    if (!editingProduct || !editFormData) return

    try {
      setIsSubmitting(true)
      await updateProduct(editingProduct.id, editFormData)
      setShowEditModal(false)
      setEditingProduct(null)
      setEditFormData({})
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle delete product
  // NOTE: see handleEditProduct above — the calling button is commented out.
  // @ts-ignore TS6133: entry point temporarily disabled in the UI
  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product)
    setShowDeleteConfirm(true)
  }

  // Confirm delete
  const confirmDelete = async () => {
    if (!productToDelete) return

    try {
      setIsSubmitting(true)
      await deleteProduct(productToDelete.id)
      setShowDeleteConfirm(false)
      setProductToDelete(null)
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Cancel operations
  const cancelEdit = () => {
    setShowEditModal(false)
    setEditingProduct(null)
    setEditFormData({})
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setProductToDelete(null)
  }

  // Handle product click for detail modal
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  const closeProductModal = () => {
    setShowProductModal(false)
    setSelectedProduct(null)
  }

  if (loading) {
    return (
      <section className="featured-collections section-bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Collections</h2>
            <p className="section-subtitle">Discover our most exquisite jewelry pieces</p>
          </div>
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading collections...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="featured-collections section-bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Collections</h2>
            <p className="section-subtitle">Discover our most exquisite jewelry pieces</p>
          </div>
          <div className="error-state">
            <p>Unable to load collections. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="collections" className="featured-collections section-bg-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">Discover our most exquisite jewelry pieces</p>
        </div>

        <div className="collections-tabs">
          {collections.map((collection, index) => (
            <button
              key={collection.id}
              className={`tab-button ${activeCollection === index ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveCollection(index);
              }}
              type="button"
            >
              {collection.name}
            </button>
          ))}
        </div>

        <div className="collection-content">
          <div className="collection-hero">
            <div className="collection-image">
              <img src={collections[activeCollection].image} alt={collections[activeCollection].name} />
              <div className="collection-overlay">
                <h3>{collections[activeCollection].name}</h3>
                <p>{collections[activeCollection].description}</p>
              </div>
            </div>
          </div>

          <div className="collection-products">
            <h4>Featured Items</h4>
            {getCollectionProducts(collections[activeCollection].category).length > 0 ? (
              <div className="products-grid">
                {getCollectionProducts(collections[activeCollection].category).map((product) => (
                  <div 
                    key={product.id} 
                    className="product-card" 
                    onClick={() => handleProductClick(product)}
                    onKeyDown={(e) => e.key === 'Enter' && handleProductClick(product)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      {product.featured && <span className="featured-badge">Featured</span>}
                      {isAuthenticated && (
                        <div className="product-actions">
                          {/* <button
                            className="action-btn edit-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditProduct(product)
                            }}
                            title="Edit Product"
                          >
                            ✏️
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteProduct(product)
                            }}
                            title="Delete Product"
                          >
                            🗑️
                          </button> */}
                        </div>
                      )}
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">{product.name}</h5>
                      <p className="product-price">₹{product.price.toLocaleString()}</p>
                      <p className="product-description">{product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>No products available in this collection yet.</p>
                {isAuthenticated && (
                  <a href={adminPath()} className="btn-luxury">Add Products</a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button className="close-btn" onClick={cancelEdit}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="edit-name">Product Name</label>
                <input
                  id="edit-name"
                  type="text"
                  value={editFormData.name || ''}
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  value={editFormData.description || ''}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-price">Price (₹)</label>
                <input
                  id="edit-price"
                  type="number"
                  value={editFormData.price || ''}
                  onChange={(e) => setEditFormData({...editFormData, price: Number(e.target.value)})}
                  placeholder="Enter price"
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-category">Category</label>
                <select
                  id="edit-category"
                  value={editFormData.category || ''}
                  onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                >
                  <option value="Diamond">Diamond</option>
                  <option value="Gold">Gold</option>
                  <option value="Pearl">Pearl</option>
                  <option value="Silver">Silver</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editFormData.featured || false}
                    onChange={(e) => setEditFormData({...editFormData, featured: e.target.checked})}
                  />
                  <span>Featured Product</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={cancelEdit} disabled={isSubmitting}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={handleUpdateProduct} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && productToDelete && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h3>Delete Product</h3>
              <button className="close-btn" onClick={cancelDelete}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this product?</p>
              <div className="product-preview">
                <img src={productToDelete.image} alt={productToDelete.name} />
                <div>
                  <h4>{productToDelete.name}</h4>
                  <p>₹{productToDelete.price.toLocaleString()}</p>
                </div>
              </div>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={cancelDelete} disabled={isSubmitting}>
                Cancel
              </button>
              <button 
                className="btn-danger" 
                onClick={confirmDelete} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={closeProductModal}
      />

      <style>{`
        .featured-collections {
          padding: 5rem 0;
        }

        .loading-state,
        .error-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--silver-light);
          border-top: 4px solid var(--gold-accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .collections-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .tab-button {
          background: white;
          border: 2px solid var(--silver-light);
          color: var(--text-dark);
          padding: 1rem 2rem;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-button:hover {
          border-color: var(--gold-accent);
          color: var(--gold-accent);
        }

        .tab-button.active {
          background: var(--gold-accent);
          border-color: var(--gold-accent);
          color: white;
        }

        .collection-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .collection-hero {
          position: relative;
        }

        .collection-image {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          height: 400px;
        }

        .collection-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .collection-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          color: white;
          padding: 2rem;
        }

        .collection-overlay h3 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .collection-overlay p {
          font-size: 1.125rem;
          margin: 0;
          opacity: 0.9;
        }

        .collection-products h4 {
          color: var(--navy-primary);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 2rem 0;
        }

        .products-grid {
          display: grid;
          gap: 1.5rem;
        }

        .product-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .product-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-actions {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-actions {
          opacity: 1;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .action-btn:hover {
          background: white;
          transform: scale(1.1);
        }

        .edit-btn:hover {
          background: #e3f2fd;
        }

        .delete-btn:hover {
          background: #ffebee;
        }

        .featured-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: var(--gold-accent);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-title {
          color: var(--navy-primary);
          font-size: 1.125rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .product-price {
          color: var(--gold-accent);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.75rem 0;
        }

        .product-description {
          color: var(--text-light);
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .no-products {
          text-align: center;
          padding: 2rem;
          color: var(--text-light);
        }

        .no-products .btn-luxury {
          margin-top: 1rem;
        }

        .btn-luxury {
          background: linear-gradient(135deg, var(--navy-primary), var(--navy-light));
          color: var(--white);
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: var(--transition-smooth);
          text-decoration: none;
          display: inline-block;
          box-shadow: var(--shadow-medium);
        }

        .btn-luxury:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-heavy);
          background: linear-gradient(135deg, var(--navy-light), var(--navy-primary));
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          max-width: 100%;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .delete-modal {
          max-width: 400px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.5rem 0 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
        }

        .modal-header h3 {
          margin: 0;
          color: var(--navy-primary);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: color 0.2s ease;
        }

        .close-btn:hover {
          color: #374151;
        }

        .modal-body {
          padding: 0 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          // display: block;
          // margin-bottom: 0.5rem;
          color: var(--navy-primary);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--gold-accent);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .checkbox-label {
          display: flex !important;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          width: auto;
          margin: 0;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1.5rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 1.5rem;
        }

        .btn-primary {
          background: var(--gold-accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary:hover:not(:disabled) {
          background: #d4af37;
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #e5e7eb;
        }

        .btn-danger {
          background: #dc2626;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-danger:hover:not(:disabled) {
          background: #b91c1c;
          transform: translateY(-1px);
        }

        .product-preview {
          display: flex;
          gap: 1rem;
          align-items: center;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .product-preview img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 0.5rem;
        }

        .product-preview h4 {
          margin: 0 0 0.25rem 0;
          color: var(--navy-primary);
          font-size: 1rem;
        }

        .product-preview p {
          margin: 0;
          color: var(--gold-accent);
          font-weight: 600;
        }

        .warning-text {
          color: #dc2626;
          font-size: 0.875rem;
          font-weight: 600;
          text-align: center;
          margin: 1rem 0 0 0;
        }

        @media (max-width: 768px) {
          .collection-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .collections-tabs {
            flex-direction: column;
            align-items: center;
          }

          .tab-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  )
}

export default FeaturedCollectionsFirebase
