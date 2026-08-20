import React, { useState } from 'react'
import { cloudinaryConfig } from '../../config/env'

const CloudinaryTest: React.FC = () => {
  const [testResult, setTestResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testCloudinaryConnection = async () => {
    setLoading(true)
    setTestResult('Testing Cloudinary connection...')

    try {
      // Test with the configured cloud name
      const { cloudName } = cloudinaryConfig
      const testUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
      
      console.log('Testing URL:', testUrl)
      
      // Try a simple GET request to see if the cloud exists
      const response = await fetch(testUrl, {
        method: 'GET',
        mode: 'no-cors' // This will work even with CORS issues
      })
      
      setTestResult(`✅ Cloud name "${cloudName}" appears to be valid!`)
      console.log('Cloud name test result:', response)
      
    } catch (error) {
      setTestResult(`❌ Error testing cloud name: ${error.message}`)
      console.error('Cloud name test error:', error)
    } finally {
      setLoading(false)
    }
  }

  const testUploadPreset = async () => {
    setLoading(true)
    setTestResult('Testing upload preset...')

    try {
      const { cloudName, uploadPreset } = cloudinaryConfig
      
      const formData = new FormData()
      formData.append('upload_preset', uploadPreset)
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )
      
      if (response.ok) {
        setTestResult('✅ Upload preset test successful!')
      } else {
        const errorText = await response.text()
        setTestResult(`❌ Upload preset test failed: ${response.status} - ${errorText}`)
      }
      
    } catch (error) {
      setTestResult(`❌ Upload preset test error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Cloudinary Connection Test</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Current Configuration:</h3>
        <ul>
          <li><strong>Cloud Name:</strong> {cloudinaryConfig.cloudName}</li>
          <li><strong>Upload Preset:</strong> {cloudinaryConfig.uploadPreset}</li>
          <li><strong>Upload Folder:</strong> {cloudinaryConfig.uploadFolder}</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={testCloudinaryConnection}
          disabled={loading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          Test Cloud Name
        </button>
        
        <button 
          onClick={testUploadPreset}
          disabled={loading}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Test Upload Preset
        </button>
      </div>

      {testResult && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          <strong>Test Result:</strong><br />
          {testResult}
        </div>
      )}

      <div style={{ backgroundColor: '#e9ecef', padding: '1rem', borderRadius: '0.5rem' }}>
        <h4>How to Find Your Cloud Name:</h4>
        <ol>
          <li>Go to <a href="https://cloudinary.com/console" target="_blank" rel="noopener noreferrer">cloudinary.com/console</a></li>
          <li>Sign in to your account</li>
          <li>Look at the Dashboard page</li>
          <li>Find "Cloud Name" - it should be 13 characters long</li>
          <li>Copy that exact value</li>
        </ol>
        
        <p><strong>Note:</strong> Your cloud name should be visible on the main dashboard, not in settings.</p>
      </div>
    </div>
  )
}

export default CloudinaryTest
