import { useState } from 'react'

const FeaturedCollections = () => {
  const [activeCollection, setActiveCollection] = useState(0)

  const collections = [
    {
      id: 1,
      name: "Diamond Collection",
      description: "Exquisite diamonds that capture every ray of light",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      items: [
        {
          name: "Eternal Diamond Ring",
          price: "$2,499",
          image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Brilliant Diamond Necklace",
          price: "$4,999",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Princess Diamond Earrings",
          price: "$1,899",
          image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        }
      ]
    },
    {
      id: 2,
      name: "Gold Collection",
      description: "Timeless elegance in precious gold",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      items: [
        {
          name: "Classic Gold Bracelet",
          price: "$899",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Vintage Gold Ring",
          price: "$1,299",
          image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Elegant Gold Chain",
          price: "$599",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        }
      ]
    },
    {
      id: 3,
      name: "Pearl Collection",
      description: "Sophisticated pearls for the modern woman",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      items: [
        {
          name: "Pearl Drop Earrings",
          price: "$799",
          image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Pearl Strand Necklace",
          price: "$1,599",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Pearl Cocktail Ring",
          price: "$1,199",
          image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        }
      ]
    }
  ]

  return (
    <section id="collections" className="section section-bg-pattern">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">
            Discover our most exquisite jewelry collections, each piece crafted with precision and passion
          </p>
        </div>

        <div className="collections-container">
          {/* Collection Tabs */}
          <div className="collection-tabs">
            {collections.map((collection, index) => (
              <button
                key={collection.id}
                className={`collection-tab ${index === activeCollection ? 'active' : ''}`}
                onClick={() => setActiveCollection(index)}
              >
                <div className="tab-content">
                  <h3>{collection.name}</h3>
                  <p>{collection.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Collection Content */}
          <div className="collection-content">
            <div className="collection-hero">
              <div className="collection-image">
                <img 
                  src={collections[activeCollection].image} 
                  alt={collections[activeCollection].name}
                />
                <div className="collection-overlay">
                  <div className="collection-info">
                    <h3>{collections[activeCollection].name}</h3>
                    <p>{collections[activeCollection].description}</p>
                    <a href="#categories" className="btn-luxury">
                      View Collection
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="collection-items">
              <h4>Featured Items</h4>
              <div className="items-grid">
                {collections[activeCollection].items.map((item, index) => (
                  <div key={index} className="product-card">
                    <div className="product-image-container">
                      <img 
                        src={item.image} 
                        alt={item.name}
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
                      </div>
                    </div>
                    <div className="product-info">
                      <h5 className="product-title">{item.name}</h5>
                      <p className="product-price">{item.price}</p>
                      <button className="btn btn-secondary btn-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .collections-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          margin-top: 3rem;
        }

        .collection-tabs {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .collection-tab {
          background: var(--white);
          border: 2px solid transparent;
          border-radius: 15px;
          padding: 1.5rem;
          text-align: left;
          cursor: pointer;
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-light);
        }

        .collection-tab:hover {
          border-color: var(--navy-primary);
          transform: translateX(5px);
        }

        .collection-tab.active {
          border-color: var(--navy-primary);
          background: linear-gradient(135deg, var(--navy-primary), var(--navy-light));
          color: var(--white);
        }

        .tab-content h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .tab-content p {
          font-size: 0.9rem;
          margin: 0;
          opacity: 0.8;
        }

        .collection-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .collection-hero {
          position: relative;
          height: 400px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-medium);
        }

        .collection-image {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .collection-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .collection-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(26, 35, 126, 0.8) 0%,
            rgba(13, 20, 66, 0.6) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-smooth);
        }

        .collection-hero:hover .collection-overlay {
          opacity: 1;
        }

        .collection-hero:hover .collection-image img {
          transform: scale(1.05);
        }

        .collection-info {
          text-align: center;
          color: var(--white);
          max-width: 400px;
          padding: 2rem;
        }

        .collection-info h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .collection-info p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .collection-items h4 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-dark);
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .product-image-container {
          position: relative;
          overflow: hidden;
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

        .btn-sm {
          padding: 8px 20px;
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .collections-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .collection-tabs {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 1rem;
          }

          .collection-tab {
            min-width: 200px;
            flex-shrink: 0;
          }
        }

        @media (max-width: 768px) {
          .collection-hero {
            height: 300px;
          }

          .collection-info h3 {
            font-size: 1.5rem;
          }

          .collection-info p {
            font-size: 1rem;
          }

          .items-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  )
}

export default FeaturedCollections
