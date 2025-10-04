// Frontend database utilities - API calls to backend
import { apiClient } from './api'
import { Product, CartItem, User, Order } from '@/types'

// API functions that call the backend
export async function getProducts(category?: string): Promise<Product[]> {
  const url = category ? `/api/products?category=${category}` : '/api/products'
  return apiClient.get(url)
}

export async function getProduct(id: string): Promise<Product> {
  return apiClient.get(`/api/products/${id}`)
}

export async function getCart(): Promise<CartItem[]> {
  return apiClient.get('/api/cart')
}

export async function addToCart(productId: string, quantity: number): Promise<void> {
  return apiClient.post('/api/cart', { productId, quantity })
}

export async function updateCartItem(itemId: string, quantity: number): Promise<void> {
  return apiClient.put(`/api/cart/${itemId}`, { quantity })
}

export async function removeFromCart(itemId: string): Promise<void> {
  return apiClient.delete(`/api/cart/${itemId}`)
}

export async function getUserOrders(): Promise<Order[]> {
  return apiClient.get('/api/orders')
}

export async function createOrder(orderData: any): Promise<Order> {
  return apiClient.post('/api/orders', orderData)
}
