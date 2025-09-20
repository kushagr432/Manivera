import { useEffect, useState } from 'react'
import { Product } from '../types/admin'

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0)

  const images = product?.images && product.images.length > 0 ? product.images : [product?.image || '']

  // Handle keyboard events for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === 'Escape') {
          closeFullscreen()
        } else if (e.key === 'ArrowLeft') {
          prevFullscreenImage()
        } else if (e.key === 'ArrowRight') {
          nextFullscreenImage()
        }
      }
    }

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen, images.length])

  if (!isOpen || !product) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const openFullscreen = (index: number) => {
    setFullscreenImageIndex(index)
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  const minimizeFullscreen = () => {
    setIsFullscreen(false)
  }

  const nextFullscreenImage = () => {
    setFullscreenImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevFullscreenImage = () => {
    setFullscreenImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }


  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={index < rating ? "#d4af37" : "#e0e0e0"}
        stroke={index < rating ? "#d4af37" : "#e0e0e0"}
        strokeWidth="2"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))
  }

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }}
    >
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="modal-content">
          <div className="product-images">
            <div className="main-image-container">
              <img 
                src={images[currentImageIndex]} 
                alt={product.name}
                className="main-image"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    className="nav-btn prev-btn" 
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"/>
                    </svg>
                  </button>
                  <button 
                    className="nav-btn next-btn" 
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                  </button>
                </>
              )}

              <div className="image-counter">
                {currentImageIndex + 1} / {images.length}
              </div>

              <button 
                className="fullscreen-btn"
                onClick={() => openFullscreen(currentImageIndex)}
                aria-label="View full size image"
                title="View full size image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </button>
            </div>

            {images.length > 1 && (
              <div className="thumbnail-gallery">
                {images.map((image, index) => (
                  <button
                    key={`thumbnail-${index}-${image.slice(0, 20)}`}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => goToImage(index)}
                  >
                    <img src={image} alt={`${product.name} view ${index + 1}`} />
                    <button 
                      className="thumbnail-fullscreen-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        openFullscreen(index)
                      }}
                      aria-label={`View full size image ${index + 1}`}
                      title={`View full size image ${index + 1}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                      </svg>
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-details">
            <div className="product-header">
              <div className="product-badges">
                {product.featured && <span className="featured-badge">Featured</span>}
                {!product.inStock && <span className="out-of-stock-badge">Out of Stock</span>}
              </div>
              <h1 id="product-title" className="product-title">{product.name}</h1>
              <div className="product-rating">
                {renderStars()}
                <span className="rating-text">(4.9/5 - 127 reviews)</span>
              </div>
            </div>

            <div className="product-price">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-specifications">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Category:</span>
                  <span className="spec-value">{product.category}</span>
                </div>
                {product.material && (
                  <div className="spec-item">
                    <span className="spec-label">Material:</span>
                    <span className="spec-value">{product.material}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="spec-item">
                    <span className="spec-label">Weight:</span>
                    <span className="spec-value">{product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="spec-item">
                    <span className="spec-label">Dimensions:</span>
                    <span className="spec-value">{product.dimensions}</span>
                  </div>
                )}
              </div>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="product-tags">
                <h3>Tags</h3>
                <div className="tags-list">
                  {product.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="product-actions">
              <button className="btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Add to Wishlist
              </button>
              <button className="btn-primary" disabled={!product.inStock}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div 
          className="fullscreen-overlay" 
          onClick={closeFullscreen}
          role="dialog"
          aria-modal="true"
          aria-label="Full size image view"
        >
          <div className="fullscreen-controls">
            <button 
              className="fullscreen-minimize-btn" 
              onClick={minimizeFullscreen}
              aria-label="Minimize to normal view"
              title="Minimize to normal view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              </svg>
            </button>
            <button 
              className="fullscreen-close-btn" 
              onClick={closeFullscreen}
              aria-label="Close fullscreen"
              title="Close"
            >
              ×
            </button>
          </div>
          
          <div 
            className="fullscreen-content" 
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={minimizeFullscreen}
            title="Double-click to minimize"
          >
            <img 
              src={images[fullscreenImageIndex]} 
              alt={`${product.name} full size`}
              className="fullscreen-image"
            />
            
            {images.length > 1 && (
              <>
                <button 
                  className="fullscreen-nav-btn fullscreen-prev-btn" 
                  onClick={prevFullscreenImage}
                  aria-label="Previous image"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </button>
                <button 
                  className="fullscreen-nav-btn fullscreen-next-btn" 
                  onClick={nextFullscreenImage}
                  aria-label="Next image"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"/>
                  </svg>
                </button>
                
                <div className="fullscreen-counter">
                  {fullscreenImageIndex + 1} / {images.length}
                  <div className="keyboard-hint">Press ESC to close, double-click to minimize</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .product-detail-modal {
          background: white;
          border-radius: 1rem;
          max-width: 1000px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          z-index: 1001;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.7);
          transform: scale(1.1);
        }

        .modal-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
          min-height: 300px;
          width: 100%;
        }

        @media (min-width: 769px) {
          .modal-content {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
          }
        }

        .product-images {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .main-image-container {
          position: relative;
          aspect-ratio: 1;
          border-radius: 1rem;
          overflow: hidden;
          background: #f8f9fa;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #333;
        }

        .nav-btn:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
        }

        .prev-btn {
          left: 1rem;
        }

        .next-btn {
          right: 1rem;
        }

        .image-counter {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .thumbnail-gallery {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding: 0.5rem 0;
        }

        .thumbnail {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 0.5rem;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .thumbnail:hover {
          border-color: var(--color-gold, #d4af37);
        }

        .thumbnail.active {
          border-color: var(--color-gold, #d4af37);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-details {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .product-header {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 1.5rem;
        }

        .product-badges {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .featured-badge {
          background: var(--color-gold, #d4af37);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .out-of-stock-badge {
          background: #dc2626;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .product-title {
          color: var(--color-navy, #1a237e);
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rating-text {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .product-price {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 0.5rem;
        }

        .current-price {
          color: var(--color-gold, #d4af37);
          font-size: 2rem;
          font-weight: 700;
        }

        .product-description h3,
        .product-specifications h3,
        .product-tags h3 {
          color: var(--color-navy, #1a237e);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .product-description p {
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        .specs-grid {
          display: grid;
          gap: 0.75rem;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem;
          background: #f8f9fa;
          border-radius: 0.5rem;
        }

        .spec-label {
          color: #6b7280;
          font-weight: 500;
        }

        .spec-value {
          color: var(--color-navy, #1a237e);
          font-weight: 600;
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background: var(--color-bg-light, #f3f4f6);
          color: var(--color-text-secondary, #6b7280);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .product-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 0.5rem;
        }

        .btn-primary,
        .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
          min-height: 50px;
          justify-content: center;
        }

        .btn-primary {
          background: var(--color-gold, #d4af37);
          color: white;
          flex: 1;
        }

        .btn-primary:hover:not(:disabled) {
          background: #b8941f;
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: white;
          color: var(--color-navy, #1a237e);
          border: 2px solid var(--color-navy, #1a237e);
        }

        .btn-secondary:hover {
          background: var(--color-navy, #1a237e);
          color: white;
        }

        /* Fullscreen button styles */
        .fullscreen-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .fullscreen-btn:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: scale(1.1);
        }

        .thumbnail {
          position: relative;
        }

        .thumbnail-fullscreen-btn {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
        }

        .thumbnail:hover .thumbnail-fullscreen-btn {
          opacity: 1;
        }

        .thumbnail-fullscreen-btn:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: scale(1.1);
        }

        /* Fullscreen overlay styles */
        .fullscreen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 2rem;
        }

        .fullscreen-controls {
          position: absolute;
          top: 2rem;
          right: 2rem;
          display: flex;
          gap: 0.5rem;
          z-index: 2001;
        }

        .fullscreen-minimize-btn,
        .fullscreen-close-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .fullscreen-minimize-btn {
          font-size: 1.2rem;
        }

        .fullscreen-minimize-btn:hover,
        .fullscreen-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .fullscreen-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fullscreen-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 0.5rem;
        }

        .fullscreen-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2001;
        }

        .fullscreen-nav-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
        }

        .fullscreen-prev-btn {
          left: 2rem;
        }

        .fullscreen-next-btn {
          right: 2rem;
        }

        .fullscreen-counter {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 1rem;
          font-weight: 600;
          text-align: center;
        }

        .keyboard-hint {
          font-size: 0.75rem;
          font-weight: 400;
          opacity: 0.8;
          margin-top: 0.25rem;
        }

        @media (max-width: 768px) {
          .modal-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem;
            min-height: auto;
          }

          .product-title {
            font-size: 1.5rem;
          }

          .current-price {
            font-size: 1.5rem;
          }

          .product-actions {
            flex-direction: column;
          }

          .thumbnail-gallery {
            justify-content: center;
          }

          .fullscreen-controls {
            top: 1rem;
            right: 1rem;
            gap: 0.25rem;
          }

          .fullscreen-minimize-btn,
          .fullscreen-close-btn {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }

          .fullscreen-minimize-btn {
            font-size: 1rem;
          }

          .keyboard-hint {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductDetailModal
