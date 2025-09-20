import { useState } from 'react'
import { useAdmin } from '../contexts/AdminContext'
import { useProducts } from '../hooks/useProducts'
import { Product } from '../types/admin'
import ProductDetailModal from './ProductDetailModal'

const ProductCategoriesFirebase = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { products, loading, error } = useProducts()
  const { isAuthenticated } = useAdmin()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)

  const categories = [
    'All',
    'Rings',
    'Necklaces',
    'Earrings',
    'Bracelets',
    'Watches',
    'Pendants',
    'Chains',
    'Bangles'
  ]

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

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
      <section className="product-categories section-bg-pattern">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Collections</h2>
            <p className="section-subtitle">Explore our wide range of exquisite jewelry</p>
          </div>
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="product-categories section-bg-pattern">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Collections</h2>
            <p className="section-subtitle">Explore our wide range of exquisite jewelry</p>
          </div>
          <div className="error-state">
            <p>Unable to load products. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="categories" className="product-categories section-bg-pattern">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Collections</h2>
          <p className="section-subtitle">Explore our wide range of exquisite jewelry</p>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
                  {!product.inStock && <span className="out-of-stock-badge">Out of Stock</span>}
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">₹{product.price.toLocaleString()}</p>
                  <p className="product-description">{product.description}</p>
                  
                  {product.material && (
                    <p className="product-material">Material: {product.material}</p>
                  )}
                  
                  {product.weight && (
                    <p className="product-weight">Weight: {product.weight}</p>
                  )}

                  <div className="product-tags">
                    {product.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <div className="no-products-icon">💎</div>
              <h3>No products found</h3>
              <p>No products available in the {selectedCategory} category yet.</p>
              {isAuthenticated && (
                <a href="/admin" className="btn-luxury">Add Products</a>
              )}
            </div>
          )}
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={closeProductModal}
      />

      <style>{`
        .product-categories {
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

        .category-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-button {
          background: white;
          border: 2px solid var(--color-border);
          color: var(--color-text);
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-button:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }

        .filter-button.active {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: white;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
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

        .product-title {
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

        .product-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .tag {
          background: var(--color-bg-light);
          color: var(--color-text-secondary);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .no-products {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
        }

        .no-products-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .no-products h3 {
          color: var(--color-navy);
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .no-products p {
          color: var(--color-text-secondary);
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .category-filters {
            flex-direction: column;
            align-items: center;
          }

          .filter-button {
            width: 100%;
            max-width: 300px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default ProductCategoriesFirebase
