'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { Product } from '@/types'
import api from '@/lib/api'

async function getProducts(searchParams: Record<string, string>): Promise<{ products: Product[], total: number }> {
  try {
    const params = new URLSearchParams()
    if (searchParams.category) params.append('category', searchParams.category)
    if (searchParams.search) params.append('search', searchParams.search)
    if (searchParams.page) params.append('page', searchParams.page)
    params.append('limit', '12')

    const response = await api.get(`/products?${params.toString()}`)
    return {
      products: response.data.products || [],
      total: response.data.total || 0
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return { products: [], total: 0 }
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const searchParams = useSearchParams()

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const params: Record<string, string> = {}
      searchParams.forEach((value, key) => {
        params[key] = value
      })
      
      const result = await getProducts(params)
      setProducts(result.products)
      setTotal(result.total)
      setLoading(false)
    }
    
    loadProducts()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>
          <p className="text-gray-600">
            {total > 0 ? `Showing ${products.length} of ${total} products` : 'No products found'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  )
}
