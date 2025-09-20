const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      name: "Rose Gold Collection",
      description: "Warm tones & timeless designs",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "Diamond Collection",
      description: "Brilliance that captures every light",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      name: "Pearl Elegance Collection",
      description: "Classic beauty re-imagined.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      name: "Modern Silver Collection",
      description: "Contemporary style & form",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ]

  return (
    <section id="collections" className="section section-bg-pattern">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">
            Discover our most sought-after jewelry selections.
          </p>
        </div>

        <div className="collections-grid">
          {collections.map((collection) => (
            <div key={collection.id} className="collection-card">
              <div className="collection-image">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                />
                <div className="collection-overlay">
                  <div className="collection-info">
                    <h3>{collection.name}</h3>
                    <p>{collection.description}</p>
                    <button className="shop-now-btn">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .collections-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .collection-card {
          position: relative;
          height: 300px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .collection-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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
          transition: transform 0.3s ease;
        }

        .collection-card:hover .collection-image img {
          transform: scale(1.05);
        }

        .collection-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.6) 50%,
            transparent 100%
          );
          padding: 2rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .collection-info {
          color: white;
        }

        .collection-info h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-family: 'Playfair Display', serif;
        }

        .collection-info p {
          font-size: 0.95rem;
          margin-bottom: 1rem;
          opacity: 0.9;
          font-weight: 300;
        }

        .shop-now-btn {
          background: transparent;
          border: 1px solid white;
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .shop-now-btn:hover {
          background: white;
          color: black;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .collections-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .collection-card {
            height: 250px;
          }

          .collection-info h3 {
            font-size: 1.2rem;
          }

          .collection-info p {
            font-size: 0.9rem;
          }

          .collection-overlay {
            padding: 1.5rem 1rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .collection-card {
            height: 200px;
          }

          .collection-info h3 {
            font-size: 1.1rem;
          }

          .collection-info p {
            font-size: 0.85rem;
            margin-bottom: 0.8rem;
          }

          .shop-now-btn {
            padding: 0.5rem 1.2rem;
            font-size: 0.85rem;
          }

          .collection-overlay {
            padding: 1.2rem 0.8rem 0.8rem;
          }
        }
      `}</style>
    </section>
  )
}

export default FeaturedCollections
