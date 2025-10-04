export interface User {
  id: string
  email: string
  name?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  title: string
  description: string | null
  price: number
  image: string | null
  stock: number
  categoryId: string
  createdAt: Date
  updatedAt: Date
  category?: Category
}

export interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  createdAt: Date
  updatedAt: Date
  product: Product
}

export interface Order {
  id: string
  userId: string
  total: number
  status: string
  stripePaymentId?: string | null
  createdAt: Date
  updatedAt: Date
  orderItems: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  product: Product
}

export interface AuthResponse {
  user: User
  token: string
}
