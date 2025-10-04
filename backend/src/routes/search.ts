import express from 'express'
import { body, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma'

const router = express.Router()

// POST /search - AI-powered semantic search (placeholder implementation)
router.post('/', [
  body('query').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Search query is required', details: errors.array() })
    }

    const { query } = req.body

    // Enhanced text-based search with case-insensitive matching
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
    
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            category: {
              name: {
                contains: query,
                mode: 'insensitive'
              }
            }
          },
          // Search for individual terms
          ...searchTerms.map(term => ({
            OR: [
              {
                title: {
                  contains: term,
                  mode: 'insensitive'
                }
              },
              {
                description: {
                  contains: term,
                  mode: 'insensitive'
                }
              }
            ]
          }))
        ]
      },
      include: {
        category: true
      },
      take: 20,
      orderBy: [
        {
          title: 'asc'
        }
      ]
    })

    // Simulate AI recommendations based on search
    const recommendations = await getRecommendations(query, products)

    res.json({
      query,
      results: products,
      recommendations,
      message: products.length > 0 
        ? `Found ${products.length} products matching "${query}"` 
        : `No products found for "${query}". Here are some recommendations:`
    })
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Placeholder AI recommendation function
async function getRecommendations(query: string, searchResults: any[]) {
  // If we found results, return related products from same categories
  if (searchResults.length > 0) {
    const categoryIds = [...new Set(searchResults.map(p => p.categoryId))]
    
    const recommendations = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryIds
        },
        id: {
          notIn: searchResults.map(p => p.id)
        }
      },
      include: {
        category: true
      },
      take: 5
    })
    
    return recommendations
  }

  // If no results, return popular products
  const popularProducts = await prisma.product.findMany({
    include: {
      category: true
    },
    take: 5,
    orderBy: {
      createdAt: 'desc'
    }
  })

  return popularProducts
}

export default router
