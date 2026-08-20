import { cloudinaryConfig } from '../config/env'

// Cloudinary configuration, sourced from environment variables.
// Only the values an unsigned browser upload needs live here; the API key and
// secret are server-side credentials and are intentionally not bundled.
export const CLOUDINARY_CONFIG = cloudinaryConfig

// Upload image to Cloudinary (unsigned upload - no API key needed)
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset)
  formData.append('folder', CLOUDINARY_CONFIG.uploadFolder) // Organize images in a folder

  try {
    console.log('Uploading to Cloudinary (unsigned)...', {
      cloudName: CLOUDINARY_CONFIG.cloudName,
      uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
      fileName: file.name,
      fileSize: file.size
    })

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Cloudinary upload failed:', response.status, errorText)
      throw new Error(`Upload failed: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    console.log('Cloudinary upload successful:', data.secure_url)
    return data.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    // throw new Error(`Failed to upload image to Cloudinary: ${error.message}`)
  }
}

// Alternative: Use a free image hosting service
export const uploadToImgBB = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_API_KEY', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.data.url
  } catch (error) {
    console.error('ImgBB upload error:', error)
    throw new Error('Failed to upload image')
  }
}

// Fallback: Convert to base64 (not recommended for production)
export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}
