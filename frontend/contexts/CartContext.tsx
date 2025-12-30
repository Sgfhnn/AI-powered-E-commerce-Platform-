'use client';

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
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
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, product:products(*)')
        .eq('user_id', user.id)

      if (error) throw error

      const cartItems = (data as any[]) || []
      setItems(cartItems)

      const totalValue = cartItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity)
      }, 0)

      setTotal(totalValue.toFixed(2))
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

      // Check if item already exists
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single()

      if (existing) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({ user_id: user.id, product_id: productId, quantity })
        if (error) throw error
      }

      await loadCart()
    } catch (error: any) {
      throw new Error(error.message || 'Failed to add item to cart')
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)

      if (error) throw error
      await loadCart()
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update quantity')
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId: string) => {
    if (!user) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)

      if (error) throw error
      await loadCart()
    } catch (error: any) {
      throw new Error(error.message || 'Failed to remove item')
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id)
    }
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
