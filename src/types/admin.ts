export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string // Main/preview image
  images: string[] // Array of all images for carousel
  featured: boolean
  inStock: boolean
  createdAt: Date
  updatedAt: Date
  tags?: string[]
  weight?: string
  material?: string
  dimensions?: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  createdAt: Date
}

export interface AdminUser {
  uid: string
  email: string
  displayName: string
  role: 'admin' | 'editor'
  createdAt: Date
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  products: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
  notes?: string
}

export interface AdminStats {
  totalProducts: number
  totalCategories: number
  totalOrders: number
  pendingOrders: number
  totalRevenue: number
}
