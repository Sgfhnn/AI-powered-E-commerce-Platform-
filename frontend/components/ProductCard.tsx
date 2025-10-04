'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/Toaster'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, loading } = useCart()
  const { user } = useAuth()

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please log in to add items to cart')
      return
    }

    try {
      await addToCart(product.id)
      toast.success('Added to cart!')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const price = product.price.toFixed(2)

  return (
    <div className="card-hover">
      <div className="relative aspect-square">
        <Image
          src={product.image || '/placeholder-product.jpg'}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm text-gray-500">{product.category?.name || 'Uncategorized'}</span>
        </div>
        
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${price}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0 || !user}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
        
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-orange-500 text-sm mt-2">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  )
}
