import React, { useEffect, useState } from 'react'
import { addProduct, deleteProduct, getProducts, updateProduct } from '../../firebase/services'
import { Product } from '../../types/admin'
import ProductForm from './ProductForm'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'createdAt'>('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const categories = [
    'Rings',
    'Necklaces', 
    'Earrings',
    'Bracelets',
    'Watches',
    'Pendants',
    'Chains',
    'Bangles'
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      console.log('Loading products...')
      const productsData = await getProducts()
      console.log('Products loaded successfully:', productsData)
      setProducts(productsData)
    } catch (error) {
      console.error('Error loading products:', error)
      console.error('Error details:', error)
      // alert(`Error loading products: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await deleteProduct(product.id)
        await loadProducts()
        alert('Product deleted successfully!')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Error deleting product. Please try again.')
      }
    }
  }

  const handleFormSubmit = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Saving product to Firebase:', productData)
      
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct.id, productData)
        console.log('Product updated successfully!')
        alert('Product updated successfully!')
      } else {
        // Add new product
        await addProduct(productData)
        console.log('Product added successfully!')
        alert('Product added successfully!')
      }
      
      setShowForm(false)
      setEditingProduct(null)
      await loadProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      // alert(`Error saving product: ${error.message}`)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || product.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy]
      let bValue: any = b[sortBy]

      if (sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    )
  }

  console.log('ProductList rendering, showForm:', showForm, 'loading:', loading, 'filteredProducts.length:', filteredProducts.length)

  return (
    <div className="product-list">
      <div className="list-header">
        <div className="header-left">
          <h1>Products</h1>
          <p>Manage your jewelry collection</p>
        </div>
        <button onClick={handleAddProduct} className="add-btn" style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
          + Add Product
        </button>
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'createdAt')}
          >
            <option value="createdAt">Date Added</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💎</div>
          <h3>No products found</h3>
          <p>Start by adding your first jewelry piece</p>
          <button onClick={handleAddProduct} className="add-btn-large" style={{ backgroundColor: 'green', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }}>
            + Add Your First Product
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.featured && <span className="featured-badge">Featured</span>}
                {!product.inStock && <span className="out-of-stock-badge">Out of Stock</span>}
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">₹{product.price.toLocaleString()}</p>
                <p className="product-description">{product.description}</p>
                
                {product.material && (
                  <p className="product-material">Material: {product.material}</p>
                )}
                
                {product.weight && (
                  <p className="product-weight">Weight: {product.weight}</p>
                )}
              </div>

              <div className="product-actions">
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .product-list {
          max-width: 1200px;
          margin: 0 auto;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--color-border);
        }

        .header-left h1 {
          color: var(--color-navy);
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .header-left p {
          color: var(--color-text-secondary);
          margin: 0;
        }

        .add-btn {
          background: var(--color-gold);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-btn:hover {
          background: var(--color-gold-dark);
          transform: translateY(-1px);
        }

        .add-btn-large {
          background: var(--color-gold);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .add-btn-large:hover {
          background: var(--color-gold-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        }

        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 200px;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid var(--color-border);
          border-radius: 0.5rem;
          font-size: 1rem;
        }

        .filter-group,
        .sort-group {
          display: flex;
          gap: 0.5rem;
        }

        .filter-group select,
        .sort-group select {
          padding: 0.75rem 1rem;
          border: 2px solid var(--color-border);
          border-radius: 0.5rem;
          font-size: 1rem;
          background: white;
        }

        .loading {
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

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          color: var(--color-navy);
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .product-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: var(--color-gold);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .out-of-stock-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: var(--color-danger);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-name {
          color: var(--color-navy);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .product-category {
          color: var(--color-gold);
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .product-price {
          color: var(--color-navy);
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
        }

        .product-description {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0 0 1rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-material,
        .product-weight {
          color: var(--color-text-secondary);
          font-size: 0.75rem;
          margin: 0.25rem 0;
        }

        .product-actions {
          padding: 0 1.5rem 1.5rem;
          display: flex;
          gap: 0.75rem;
        }

        .edit-btn {
          flex: 1;
          background: var(--color-gold);
          color: blue;
          border: none;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .edit-btn:hover {
          background: var(--color-gold-dark);
        }

        .delete-btn {
          flex: 1;
          background: var(--color-danger);
          color: red;
          border: none;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .delete-btn:hover {
          background: #c33;
        }

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
          }

          .filter-group,
          .sort-group {
            flex-direction: column;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductList
