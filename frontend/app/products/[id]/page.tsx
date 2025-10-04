'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/Toaster'
import { ShoppingCartIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Product } from '@/types'
import api from '@/lib/api'

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, loading: cartLoading } = useCart()
  const { user } = useAuth()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true)
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.error('Failed to fetch product:', error)
      toast.error('Product not found')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please log in to add items to cart')
      return
    }

    if (!product) return

    try {
      await addToCart(product.id, quantity)
      toast.success(`Added ${quantity} item(s) to cart!`)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Product not found</p>
          <Link href="/products" className="btn-primary mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/products" className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image || 'https://via.placeholder.com/600x600?text=No+Image'}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-xl">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.category?.name || 'Uncategorized'}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-4xl font-bold text-primary-600">${product.price}</p>
          </div>

          {product.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Availability</h3>
            <p className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-orange-500 text-sm mt-1">
                Only {product.stock} left - order soon!
              </p>
            )}
          </div>

          {product.stock > 0 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="input-field w-24"
                >
                  {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={cartLoading || !user}
                className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>{cartLoading ? 'Adding...' : 'Add to Cart'}</span>
              </button>

              {!user && (
                <p className="text-sm text-gray-500 text-center">
                  <Link href="/login" className="text-primary-600 hover:text-primary-700">
                    Sign in
                  </Link>{' '}
                  to add items to your cart
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
