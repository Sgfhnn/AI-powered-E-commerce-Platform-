export interface User {
  id: string
  email: string
  name?: string | null
  created_at?: string
}

export interface Category {
  id: string
  name: string
  description: string | null
  created_at?: string
}

export interface Product {
  id: string
  title: string
  description: string | null
  price: number
  image: string | null
  stock: number
  category_id: string
  created_at?: string
  category?: Category
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at?: string
  product: Product
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: string
  created_at?: string
  order_items: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  product: Product
}
