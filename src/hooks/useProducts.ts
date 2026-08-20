import { useEffect, useState } from 'react'
import { getProductsByCategory, subscribeToProducts } from '../firebase/services'
import { Product } from '../types/admin'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToProducts((productsData) => {
      setProducts(productsData)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  return { products, loading, error }
}

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToProducts((allProducts) => {
      // Filter only featured products
      const featuredProducts = allProducts.filter(product => product.featured)
      setProducts(featuredProducts)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  return { products, loading, error }
}

export const useProductsByCategory = (category: string) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!category) {
      setProducts([])
      setLoading(false)
      return
    }

    const loadProductsByCategory = async () => {
      try {
        setLoading(true)
        const categoryProducts = await getProductsByCategory(category)
        setProducts(categoryProducts)
        setError(null)
      } catch (err) {
        setError('Failed to load products')
        console.error('Error loading products by category:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProductsByCategory()
  }, [category])

  return { products, loading, error }
}

