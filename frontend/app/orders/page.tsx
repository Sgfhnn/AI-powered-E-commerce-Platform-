'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/Toaster'
import ConfirmModal from '@/components/ConfirmModal'
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
      category: {
        name: string
      }
    }
  }>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchOrders()
  }, [user, router])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await api.get('/orders')
      setOrders(response.data.orders)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = (orderId: string, orderTotal: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Cancel Order',
      message: `Are you sure you want to cancel this order (Total: $${orderTotal})? This action cannot be undone.`,
      onConfirm: () => cancelOrder(orderId)
    })
  }

  const cancelOrder = async (orderId: string) => {
    try {
      await api.put(`/orders/${orderId}/cancel`)
      
      // Update the order status locally
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'CANCELLED' }
            : order
        )
      )
      
      toast.success('Order cancelled successfully!')
    } catch (error) {
      console.error('Failed to cancel order:', error)
      toast.error('Failed to cancel order. Please try again.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'text-green-600 bg-green-100'
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100'
      case 'SHIPPED':
        return 'text-blue-600 bg-blue-100'
      case 'DELIVERED':
        return 'text-purple-600 bg-purple-100'
      case 'CANCELLED':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Please log in to view your orders</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">You haven't placed any orders yet</p>
          <Link href="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-bold text-lg">${order.total}</p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Items ({order.orderItems.length})</h3>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image || 'https://via.placeholder.com/64x64?text=No+Image'}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/products/${item.product.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-primary-600 block truncate"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-sm text-gray-500">{item.product.category?.name || 'Uncategorized'}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions */}
                <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row gap-3">
                  <Link 
                    href={`/products`}
                    className="btn-outline text-center"
                  >
                    Buy Again
                  </Link>
                  {order.status === 'DELIVERED' && (
                    <button className="btn-secondary">
                      Leave Review
                    </button>
                  )}
                  {order.status === 'PENDING' && (
                    <button 
                      onClick={() => handleCancelOrder(order.id, order.total)}
                      className="btn-secondary text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Cancel Order"
        type="warning"
      />
    </div>
  )
}
