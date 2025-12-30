import { supabase } from '@/lib/supabase'

async function getProducts(searchParams: Record<string, string>): Promise<{ products: Product[], total: number }> {
  try {
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })

    if (searchParams.category) {
      query = query.eq('category_id', searchParams.category)
    }

    if (searchParams.search) {
      query = query.ilike('title', `%${searchParams.search}%`)
    }

    // Pagination
    const page = parseInt(searchParams.page || '1')
    const limit = 12
    const from = (page - 1) * limit
    const to = from + limit - 1

    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error
    return {
      products: (data as any) || [],
      total: count || 0
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
            {total > 0 ? `Showing ${products.length} of ${total} products` : 'products found'}
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
