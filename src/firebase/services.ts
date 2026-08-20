import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore'
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes
} from 'firebase/storage'
import { Category, Order, Product } from '../types/admin'
import { db, storage } from './config'
import { getErrorMessage } from '../utils/errors'

// Products Collection
export const productsCollection = collection(db, 'products')
export const categoriesCollection = collection(db, 'categories')
export const ordersCollection = collection(db, 'orders')

// Product Services
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  const productData = {
    ...product,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }
  const docRef = await addDoc(productsCollection, productData)
  return docRef.id
}

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const productRef = doc(db, 'products', id)
  const updateData = {
    ...product,
    updatedAt: Timestamp.now()
  }
  await updateDoc(productRef, updateData)
}

export const deleteProduct = async (id: string) => {
  const productRef = doc(db, 'products', id)
  await deleteDoc(productRef)
}

export const getProducts = async () => {
  const q = query(productsCollection, orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date()
  })) as Product[]
}

export const getProduct = async (id: string) => {
  const productRef = doc(db, 'products', id)
  const productSnap = await getDoc(productRef)
  if (productSnap.exists()) {
    const data = productSnap.data()
    return {
      id: productSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    } as Product
  }
  return null
}

export const getFeaturedProducts = async () => {
  const q = query(productsCollection, where('featured', '==', true), orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date()
  })) as Product[]
}

export const getProductsByCategory = async (category: string) => {
  const q = query(productsCollection, where('category', '==', category), orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date()
  })) as Product[]
}

// Category Services
export const addCategory = async (category: Omit<Category, 'id' | 'createdAt'>) => {
  const categoryData = {
    ...category,
    createdAt: Timestamp.now()
  }
  const docRef = await addDoc(categoriesCollection, categoryData)
  return docRef.id
}

export const updateCategory = async (id: string, category: Partial<Category>) => {
  const categoryRef = doc(db, 'categories', id)
  await updateDoc(categoryRef, category)
}

export const deleteCategory = async (id: string) => {
  const categoryRef = doc(db, 'categories', id)
  await deleteDoc(categoryRef)
}

export const getCategories = async () => {
  const q = query(categoriesCollection, orderBy('name'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date()
  })) as Category[]
}

// Image Upload Service
export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    console.log('Starting image upload...', { fileName: file.name, fileSize: file.size, path })
    
    // Create a reference to the file location
    const storageRef = ref(storage, `images/${path}/${Date.now()}_${file.name}`)
    console.log('Storage reference created:', storageRef.fullPath)
    
    // Upload the file
    console.log('Uploading bytes...')
    const snapshot = await uploadBytes(storageRef, file)
    console.log('Upload complete:', snapshot)
    
    // Get the download URL
    console.log('Getting download URL...')
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log('Download URL obtained:', downloadURL)
    
    return downloadURL
  } catch (error) {
    console.error('Image upload error:', error)
    throw new Error(`Failed to upload image: ${getErrorMessage(error)}`)
  }
}

export const deleteImage = async (imageUrl: string) => {
  const imageRef = ref(storage, imageUrl)
  await deleteObject(imageRef)
}

// Real-time listeners
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const q = query(productsCollection, orderBy('createdAt', 'desc'))
  return onSnapshot(q, (querySnapshot) => {
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    })) as Product[]
    callback(products)
  })
}

export const subscribeToCategories = (callback: (categories: Category[]) => void) => {
  const q = query(categoriesCollection, orderBy('name'))
  return onSnapshot(q, (querySnapshot) => {
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    })) as Category[]
    callback(categories)
  })
}

// Order Services
export const addOrder = async (order: Omit<Order, 'id' | 'createdAt'>) => {
  const orderData = {
    ...order,
    createdAt: Timestamp.now()
  }
  const docRef = await addDoc(ordersCollection, orderData)
  return docRef.id
}

export const updateOrder = async (id: string, order: Partial<Order>) => {
  const orderRef = doc(db, 'orders', id)
  await updateDoc(orderRef, order)
}

export const getOrders = async () => {
  const q = query(ordersCollection, orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date()
  })) as Order[]
}
