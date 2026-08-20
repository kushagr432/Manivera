import { useState } from 'react'

const ProductCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Products', icon: '💎' },
    { id: 'rings', name: 'Rings', icon: '💍' },
    { id: 'necklaces', name: 'Necklaces', icon: '📿' },
    { id: 'earrings', name: 'Earrings', icon: '👂' },
    { id: 'bracelets', name: 'Bracelets', icon: '🤲' },
    { id: 'watches', name: 'Watches', icon: '⌚' }
  ]

  const products = [
    {
      id: 1,
      name: "Eternal Diamond Ring",
      price: "$2,499",
      category: "rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "A stunning diamond ring with brilliant cut stones",
      featured: true
    },
    {
      id: 2,
      name: "Pearl Drop Earrings",
      price: "$799",
      category: "earrings",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Elegant pearl drop earrings for special occasions",
      featured: false
    },
    {
      id: 3,
      name: "Gold Chain Necklace",
      price: "$1,299",
      category: "necklaces",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Classic gold chain necklace with intricate details",
      featured: true
    },
    {
      id: 4,
      name: "Diamond Tennis Bracelet",
      price: "$3,999",
      category: "bracelets",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Luxurious diamond tennis bracelet with brilliant stones",
      featured: false
    },
    {
      id: 5,
      name: "Luxury Gold Watch",
      price: "$4,999",
      category: "watches",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Premium gold watch with diamond accents",
      featured: true
    },
    {
      id: 6,
      name: "Emerald Ring",
      price: "$1,899",
      category: "rings",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Beautiful emerald ring with gold setting",
      featured: false
    },
    {
      id: 7,
      name: "Sapphire Earrings",
      price: "$2,199",
      category: "earrings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Stunning sapphire earrings with diamond accents",
      featured: false
    },
    {
      id: 8,
      name: "Pearl Necklace",
      price: "$1,599",
      category: "necklaces",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      description: "Elegant pearl necklace for sophisticated looks",
      featured: false
    }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <section id="categories" className="section section-bg-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Collections</h2>
          <p className="section-subtitle">
            Explore our carefully curated selection of fine jewelry across different categories
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.featured && (
                <div className="featured-badge">
                  <span>Featured</span>
                </div>
              )}
              
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-overlay">
                  <button className="btn-icon" aria-label="Add to wishlist">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button className="btn-icon" aria-label="Quick view">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                  <button className="btn-icon" aria-label="Add to cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="product-info">
                <h5 className="product-title">{product.name}</h5>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button className="btn btn-primary btn-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-5">
          <button className="btn-luxury">
            Load More Products
          </button>
        </div>
      </div>

      <style>{`
        .category-filter {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: var(--white);
          border: 2px solid var(--silver-light);
          border-radius: 50px;
          cursor: pointer;
          transition: var(--transition-smooth);
          font-weight: 500;
          color: var(--text-dark);
        }

        .category-btn:hover {
          border-color: var(--navy-primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-light);
        }

        .category-btn.active {
          background: linear-gradient(135deg, var(--navy-primary), var(--navy-light));
          border-color: var(--navy-primary);
          color: var(--white);
        }

        .category-icon {
          font-size: 1.2rem;
        }

        .category-name {
          font-size: 0.9rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .product-image-container {
          position: relative;
          overflow: hidden;
          border-radius: 15px 15px 0 0;
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: var(--transition-smooth);
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, var(--gold-accent), #f4d03f);
          color: var(--white);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 2;
        }

        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .product-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--gold-accent);
        }

        .btn-sm {
          padding: 8px 20px;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .category-filter {
            gap: 0.5rem;
            margin-bottom: 2rem;
          }

          .category-btn {
            padding: 0.8rem 1.2rem;
            font-size: 0.9rem;
          }

          .category-name {
            display: none;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .product-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }

          .category-btn {
            padding: 0.6rem 1rem;
          }
        }
      `}</style>
    </section>
  )
}

export default ProductCategories
