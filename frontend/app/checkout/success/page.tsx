'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import api from '@/lib/api'

interface Order {
  id: string
  total: string
  status: string
  createdAt: string
  orderItems: Array<{
    id: string
    quantity: number
    price: string
    product: {
      id: string
      title: string
      image?: string
    }
  }>
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const { clearCart } = useCart()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      setError('Invalid checkout session')
      setLoading(false)
      return
    }

    handleSuccessfulPayment(sessionId)
  }, [user, searchParams, router])

  const handleSuccessfulPayment = async (sessionId: string) => {
    try {
      setLoading(true)
      const response = await api.get(`/checkout/success?session_id=${sessionId}`)
      
      if (response.data.success) {
        setOrder(response.data.order)
        clearCart() // Clear the cart after successful payment
      } else {
        setError(response.data.message || 'Payment verification failed')
      }
    } catch (error: any) {
      console.error('Payment verification error:', error)
      setError(error.response?.data?.error || 'Failed to verify payment')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Please log in to view order details</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Verifying payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Payment Error</h1>
            <p className="text-red-600 mb-4">{error}</p>
            <Link href="/cart" className="btn-primary">
              Return to Cart
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Thank you for your order. We'll send you a confirmation email shortly.</p>
        </div>

        {order && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-bold text-lg">${order.total}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.product.title}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders" className="btn-primary text-center">
            View All Orders
          </Link>
          <Link href="/products" className="btn-outline text-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
