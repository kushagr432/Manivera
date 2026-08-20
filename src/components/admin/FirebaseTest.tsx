import { addDoc, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config'

const FirebaseTest: React.FC = () => {
  const [status, setStatus] = useState('Testing...')
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    testFirebaseConnection()
  }, [])

  const testFirebaseConnection = async () => {
    try {
      setStatus('Testing Firebase connection...')
      
      // Test reading from products collection
      const productsRef = collection(db, 'products')
      const snapshot = await getDocs(productsRef)
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setProducts(productsList)
      setStatus(`✅ Firebase connected! Found ${productsList.length} products.`)
      
    } catch (error: any) {
      console.error('Firebase test error:', error)
      setStatus(`❌ Firebase error: ${error.message}`)
    }
  }

  const addTestProduct = async () => {
    try {
      setStatus('Adding test product...')
      
      const productsRef = collection(db, 'products')
      await addDoc(productsRef, {
        name: 'Test Diamond Ring',
        price: 25000,
        category: 'Rings',
        description: 'This is a test product to verify Firebase connection',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        featured: true,
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      setStatus('✅ Test product added successfully!')
      testFirebaseConnection() // Refresh the list
      
    } catch (error: any) {
      console.error('Add product error:', error)
      setStatus(`❌ Error adding product: ${error.message}`)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Firebase Connection Test</h2>
      
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '0.5rem',
        marginBottom: '1rem'
      }}>
        <strong>Status:</strong> {status}
      </div>

      <button 
        onClick={addTestProduct}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        Add Test Product
      </button>

      <button 
        onClick={testFirebaseConnection}
        style={{
          backgroundColor: '#2196F3',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          marginLeft: '1rem'
        }}
      >
        Test Again
      </button>

      {products.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Products in Database:</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <strong>{product.name}</strong> - ₹{product.price?.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FirebaseTest

