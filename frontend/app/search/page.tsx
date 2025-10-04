'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { Product } from '@/types'
import api from '@/lib/api'

interface SearchResult {
  query: string
  results: Product[]
  recommendations: Product[]
  message: string
}

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setQuery(q)
      performSearch(q)
    }
  }, [searchParams])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const response = await api.post('/search', { query: searchQuery })
      setSearchResult(response.data)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      performSearch(query)
      // Update URL without page reload
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <SparklesIcon className="h-8 w-8 text-primary-600 mr-2" />
          <h1 className="text-3xl font-bold">AI-Powered Search</h1>
        </div>
        <p className="text-gray-600 mb-6">
          Use natural language to find exactly what you're looking for
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Try: 'wireless headphones for running' or 'comfortable winter jacket'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-2 btn-primary px-6 py-2"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Search Examples */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-gray-500">Try:</span>
          {[
            'gaming laptop under $1000',
            'organic cotton t-shirts',
            'books about artificial intelligence',
            'home office desk setup'
          ].map((example) => (
            <button
              key={example}
              onClick={() => {
                setQuery(example)
                performSearch(example)
              }}
              className="text-sm text-primary-600 hover:text-primary-700 underline"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center">
            <SparklesIcon className="animate-spin h-6 w-6 text-primary-600 mr-2" />
            <span className="text-gray-600">AI is searching for you...</span>
          </div>
        </div>
      )}

      {searchResult && !loading && (
        <div className="space-y-8">
          {/* Search Message */}
          <div className="text-center">
            <p className="text-lg text-gray-700">{searchResult.message}</p>
          </div>

          {/* Search Results */}
          {searchResult.results.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Search Results for "{searchResult.query}"
              </h2>
              <ProductGrid products={searchResult.results} />
            </div>
          )}

          {/* AI Recommendations */}
          {searchResult.recommendations.length > 0 && (
            <div>
              <div className="flex items-center mb-6">
                <SparklesIcon className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-2xl font-bold">
                  {searchResult.results.length > 0 ? 'You Might Also Like' : 'Recommended for You'}
                </h2>
              </div>
              <ProductGrid products={searchResult.recommendations} />
            </div>
          )}

          {/* No Results - Show Browse Options */}
          {searchResult.results.length === 0 && searchResult.recommendations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-6">
                Try different keywords or browse our categories
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    setQuery('')
                    setSearchResult(null)
                  }}
                  className="btn-outline"
                >
                  Clear Search
                </button>
                <a href="/products" className="btn-primary">
                  Browse All Products
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search Tips */}
      {!searchResult && !loading && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">How AI Search Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Natural Language</h3>
              <p className="text-gray-600">
                Search using everyday language. Describe what you need, how you'll use it, or what features matter to you.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">
                Our AI understands context and finds products that match your intent, not just keywords.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Results</h3>
              <p className="text-gray-600">
                Get recommendations tailored to your preferences and discover products you might love.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
