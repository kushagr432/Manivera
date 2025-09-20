import React, { useRef, useState } from 'react'
import { convertToBase64, uploadImageToCloudinary } from '../../services/cloudinaryService'
import { Product } from '../../types/admin'

interface ProductFormProps {
  product?: Product | null
  onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    category: product?.category || '',
    description: product?.description || '',
    image: product?.image || '',
    featured: product?.featured || false,
    inStock: product?.inStock || true,
    tags: product?.tags?.join(', ') || '',
    weight: product?.weight || '',
    material: product?.material || '',
    dimensions: product?.dimensions || ''
  })

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>(product?.images || [product?.image || ''])
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setImageFiles(files)
      
      const readers = files.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            resolve(e.target?.result as string)
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(readers).then(previews => {
        setImagePreviews(prev => [...prev, ...previews])
      })
    }
  }

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    if (index < imageFiles.length) {
      setImageFiles(prev => prev.filter((_, i) => i !== index))
    }
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex(prev => prev - 1)
    }
  }

  const setMainImage = (index: number) => {
    setMainImageIndex(index)
    setFormData(prev => ({ ...prev, image: imagePreviews[index] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setUploading(true)
      
      let imageUrls: string[] = imagePreviews
      
      // Upload new images if selected
      if (imageFiles.length > 0) {
        console.log('Uploading image files:', imageFiles.map(f => f.name))
        
        const uploadPromises = imageFiles.map(async (file) => {
          try {
            // Try Cloudinary first
            const url = await uploadImageToCloudinary(file)
            console.log(`Image ${file.name} uploaded to Cloudinary successfully!`)
            return url
          } catch (error) {
            console.error(`Cloudinary upload failed for ${file.name}, trying base64:`, error)
            try {
              // Fallback to base64 if Cloudinary fails
              const url = await convertToBase64(file)
              console.log(`Image ${file.name} converted to base64 as fallback`)
              return url
            } catch (base64Error) {
              console.error(`Base64 conversion also failed for ${file.name}, using default:`, base64Error)
              // Use a default image if both methods fail
              return 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
            }
          }
        })

        const uploadedUrls = await Promise.all(uploadPromises)
        
        // Combine existing images (from base64 or URLs) with newly uploaded ones
        const existingImages = imagePreviews.slice(0, imagePreviews.length - imageFiles.length)
        imageUrls = [...existingImages, ...uploadedUrls]
      }

      // Ensure we have at least one image
      if (imageUrls.length === 0) {
        imageUrls = ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80']
      }

      // Set main image (the one selected as preview)
      const mainImageUrl = imageUrls[mainImageIndex] || imageUrls[0]

      const productData = {
        ...formData,
        image: mainImageUrl,
        images: imageUrls,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        price: Number(formData.price)
      }

      console.log('Submitting product data:', productData)
      await onSubmit(productData)
      console.log('Product submitted successfully!')
    } catch (error) {
      console.error('Error submitting product:', error)
      alert(`Error saving product: ${error instanceof Error ? error.message : 'Unknown error occurred'}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="product-form">
      <div className="form-header">
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        <button onClick={onCancel} className="cancel-btn">
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="e.g., Diamond Engagement Ring"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="material">Material</label>
            <input
              type="text"
              id="material"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              placeholder="e.g., 18K Gold, Platinum"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            placeholder="Describe the product features, design, and quality..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="e.g., 2.5g, 1.2 carats"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dimensions">Dimensions</label>
            <input
              type="text"
              id="dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              placeholder="e.g., 6mm x 8mm"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="e.g., engagement, diamond, gold, vintage"
          />
        </div>

        <div className="form-group">
          <label htmlFor="product-image">Product Images *</label>
          <div className="image-upload">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
            />
            
            <button 
              type="button"
              className="image-upload-area"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-icon">📷</div>
              <p>Click to upload product images</p>
              <small>PNG, JPG up to 10MB each (multiple files allowed)</small>
            </button>

            {imagePreviews.length > 0 && (
              <div className="images-gallery">
                <h4>Uploaded Images</h4>
                <div className="images-grid">
                  {imagePreviews.map((preview, index) => (
                    <div key={`preview-${index}-${preview.slice(0, 20)}`} className="image-item">
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      <div className="image-actions">
                        {index === mainImageIndex && (
                          <span className="main-image-badge">Main</span>
                        )}
                        <button
                          type="button"
                          onClick={() => setMainImage(index)}
                          className={`set-main-btn ${index === mainImageIndex ? 'active' : ''}`}
                          title="Set as main image"
                        >
                          {index === mainImageIndex ? '✓' : '☆'}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-btn"
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="main-image-note">
                  Click the star (☆) to set which image appears as the main preview
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              <span>Featured Product</span>
            </label>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              <span>In Stock</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Featured Collections</label>
          <div className="collections-checkboxes">
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="diamondCollection"
                  checked={formData.tags?.includes('diamond') || formData.category?.toLowerCase().includes('diamond')}
                  onChange={(e) => {
                    const isChecked = e.target.checked
                    const currentTags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
                    
                    if (isChecked) {
                      if (!currentTags.includes('diamond')) {
                        currentTags.push('diamond')
                      }
                    } else {
                      const index = currentTags.indexOf('diamond')
                      if (index > -1) {
                        currentTags.splice(index, 1)
                      }
                    }
                    
                    setFormData(prev => ({
                      ...prev,
                      tags: currentTags.join(', ')
                    }))
                  }}
                />
                <span className="checkmark"></span>
                <span>💎 Diamond Collection</span>
              </label>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="goldCollection"
                  checked={formData.tags?.includes('gold') || formData.category?.toLowerCase().includes('gold')}
                  onChange={(e) => {
                    const isChecked = e.target.checked
                    const currentTags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
                    
                    if (isChecked) {
                      if (!currentTags.includes('gold')) {
                        currentTags.push('gold')
                      }
                    } else {
                      const index = currentTags.indexOf('gold')
                      if (index > -1) {
                        currentTags.splice(index, 1)
                      }
                    }
                    
                    setFormData(prev => ({
                      ...prev,
                      tags: currentTags.join(', ')
                    }))
                  }}
                />
                <span className="checkmark"></span>
                <span>🥇 Gold Collection</span>
              </label>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="pearlCollection"
                  checked={formData.tags?.includes('pearl') || formData.category?.toLowerCase().includes('pearl')}
                  onChange={(e) => {
                    const isChecked = e.target.checked
                    const currentTags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
                    
                    if (isChecked) {
                      if (!currentTags.includes('pearl')) {
                        currentTags.push('pearl')
                      }
                    } else {
                      const index = currentTags.indexOf('pearl')
                      if (index > -1) {
                        currentTags.splice(index, 1)
                      }
                    }
                    
                    setFormData(prev => ({
                      ...prev,
                      tags: currentTags.join(', ')
                    }))
                  }}
                />
                <span className="checkmark"></span>
                <span>🐚 Pearl Collection</span>
              </label>
            </div>
          </div>
          <p className="form-help">Check the collections where this product should appear. Products will automatically appear in collections based on their category and tags.</p>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button style={{color: "navy"}}
            type="submit" 
            className="btn-primary"
            disabled={loading || uploading}
          >
            {(() => {
              if (loading || uploading) return 'Saving...'
              return product ? 'Update Product' : 'Add Product'
            })()}
          </button>
        </div>
      </form>

      <style>{`
        .product-form {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .form-header {
          background: var(--color-navy);
          color: white;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .form-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .cancel-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background 0.3s ease;
        }

        .cancel-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .form {
          padding: 2rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          // display: block;
          color: var(--color-text);
          font-weight: 600;
          // margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid var(--color-border);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .image-upload {
          margin-top: 0.5rem;
        }

        .image-preview {
          position: relative;
          display: inline-block;
        }

        .image-preview img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 0.5rem;
          border: 2px solid var(--color-border);
        }

        .change-image-btn {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          right: 0.5rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          padding: 0.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .image-upload-area {
          border: 2px dashed var(--color-border);
          border-radius: 0.5rem;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: none;
          width: 100%;
          display: block;
        }

        .image-upload-area:hover {
          border-color: var(--color-gold);
          background: rgba(212, 175, 55, 0.05);
        }

        .upload-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .images-gallery {
          margin-top: 1rem;
        }

        .images-gallery h4 {
          color: var(--color-text);
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .image-item {
          position: relative;
          border: 2px solid var(--color-border);
          border-radius: 0.5rem;
          overflow: hidden;
          background: white;
        }

        .image-item img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          display: block;
        }

        .image-actions {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          display: flex;
          gap: 0.25rem;
        }

        .main-image-badge {
          background: var(--color-gold);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
        }

        .set-main-btn,
        .remove-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .set-main-btn {
          background: rgba(255, 255, 255, 0.9);
          color: #333;
        }

        .set-main-btn:hover {
          background: white;
          transform: scale(1.1);
        }

        .set-main-btn.active {
          background: var(--color-gold);
          color: white;
        }

        .remove-btn {
          background: rgba(220, 38, 38, 0.9);
          color: white;
        }

        .remove-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        .main-image-note {
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          margin: 0;
          font-style: italic;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          background: #f9fafb;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: 500;
          color: #374151;
          font-size: 1rem;
        }

        .checkbox-label input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          display: inline-block;
          width: 24px;
          height: 24px;
          border: 2px solid #d1d5db;
          border-radius: 0.25rem;
          margin-right: 0.75rem;
          position: relative;
          transition: all 0.3s ease;
          background: white;
          flex-shrink: 0;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
          background: #d4af37;
          border-color: #d4af37;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-weight: bold;
        }

        .checkbox-label:hover .checkmark {
          border-color: #9ca3af;
          transform: scale(1.05);
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark:hover {
          background: #b8941f;
          border-color: #b8941f;
        }

        .collections-checkboxes {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .form-help {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.5rem;
          font-style: italic;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
        }

        .btn-secondary {
          background: white;
          color: var(--color-text);
          border: 2px solid var(--color-border);
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: var(--color-bg-light);
        }

        .btn-primary {
          background: var(--color-gold);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover:not(:disabled) {
          background: var(--color-gold-dark);
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .form-actions {
            flex-direction: column;
          }

          .form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default ProductForm
