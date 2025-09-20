import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAHwpE-Vbqvrt6nNy40BII52_TdLogY-C0",
  authDomain: "manvira-75a85.firebaseapp.com",
  projectId: "manvira-75a85",
  storageBucket: "manvira-75a85.firebasestorage.app",
  messagingSenderId: "805683999261",
  appId: "1:805683999261:web:174bca2f2d3022fefb8cf4",
  measurementId: "G-XV60ST8NYQ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
