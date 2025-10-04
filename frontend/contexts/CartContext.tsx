'use client';

import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '@/lib/api'
import { useAuth } from './AuthContext'
import { Product, CartItem } from '@/types'

interface CartContextType {
  items: CartItem[]
  total: string
  addToCart: (productId: string, quantity?: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => void
  loading: boolean
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState('0.00')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      loadCart()
    } else {
      setItems([])
      setTotal('0.00')
    }
  }, [user])

  const loadCart = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const response = await api.get('/cart')
      setItems(response.data.items)
      setTotal(response.data.total)
    } catch (error) {
      console.error('Failed to load cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId: string, quantity = 1) => {
    if (!user) {
      throw new Error('Please log in to add items to cart')
    }

    try {
      setLoading(true)
      const response = await api.post('/cart', { productId, quantity })
      await loadCart() // Reload cart to get updated data
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to add item to cart')
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return

    try {
      setLoading(true)
      await api.put(`/cart/${itemId}`, { quantity })
      await loadCart()
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to update quantity')
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId: string) => {
    if (!user) return

    try {
      setLoading(true)
      await api.delete(`/cart/${itemId}`)
      await loadCart()
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to remove item')
    } finally {
      setLoading(false)
    }
  }

  const clearCart = () => {
    setItems([])
    setTotal('0.00')
  }

  const value = {
    items,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loading,
    itemCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
