import React, { useState } from 'react'

const CloudinaryPresetTest: React.FC = () => {
  const [testResult, setTestResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testPreset = async (presetName: string) => {
    setLoading(true)
    setTestResult(`Testing preset: ${presetName}`)

    try {
      const cloudName = 'dqdptzbbn'
      
      const formData = new FormData()
      formData.append('upload_preset', presetName)
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )
      
      if (response.ok) {
        setTestResult(`✅ SUCCESS! Preset "${presetName}" works!`)
        return true
      } else {
        const errorText = await response.text()
        setTestResult(`❌ Preset "${presetName}" failed: ${response.status} - ${errorText}`)
        return false
      }
      
    } catch (error) {
      setTestResult(`❌ Preset "${presetName}" error: ${error.message}`)
      return false
    } finally {
      setLoading(false)
    }
  }

  const testAllPresets = async () => {
    const presets = [
      'ml_default',
      'unsigned', 
      'jewelry_products',
      'default',
      'auto',
      'preset1',
      'test'
    ]

    setTestResult('Testing all common preset names...')
    
    for (const preset of presets) {
      const success = await testPreset(preset)
      if (success) {
        setTestResult(`✅ FOUND WORKING PRESET: "${preset}"`)
        break
      }
      // Wait a bit between tests
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Cloudinary Preset Tester</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <p>This will test different preset names to find one that works with your Cloudinary account.</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={testAllPresets}
          disabled={loading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Testing...' : 'Test All Common Presets'}
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Individual Preset Tests:</h3>
        {['ml_default', 'unsigned', 'jewelry_products', 'default'].map(preset => (
          <button
            key={preset}
            onClick={() => testPreset(preset)}
            disabled={loading}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              margin: '0.25rem'
            }}
          >
            Test {preset}
          </button>
        ))}
      </div>

      {testResult && (
        <div style={{
          padding: '1rem',
          backgroundColor: testResult.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${testResult.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          <strong>Test Result:</strong><br />
          {testResult}
        </div>
      )}

      <div style={{ backgroundColor: '#e9ecef', padding: '1rem', borderRadius: '0.5rem' }}>
        <h4>How to Create Your Own Preset:</h4>
        <ol>
          <li>Go to Cloudinary Console → Settings → Upload</li>
          <li>Click "Add upload preset"</li>
          <li>Name: <code>jewelry_products</code></li>
          <li>Signing Mode: <strong>Unsigned</strong></li>
          <li>Access Mode: <strong>Public</strong></li>
          <li>Click "Save"</li>
        </ol>
      </div>
    </div>
  )
}

export default CloudinaryPresetTest

