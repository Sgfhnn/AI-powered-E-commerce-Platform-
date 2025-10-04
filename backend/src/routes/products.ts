import express from 'express'
import { query, body, param, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma'
import { requireAuth, optionalAuth, AuthRequest } from '../middleware/auth'

const router = express.Router()
// GET /products - Get all products with optional filtering
router.get('/', [
  query('category').optional().trim(),
  query('search').optional().trim(),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt()
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid query parameters', details: errors.array() })
    }

    const { category, search, page = 1, limit = 12 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const where: any = {}

    if (category) {
      where.category = {
        name: {
          equals: category as string,
          mode: 'insensitive'
        }
      }
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search as string,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search as string,
            mode: 'insensitive'
          }
        }
      ]
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true
        },
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.product.count({ where })
    ])

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /products/:id - Get a single product
router.get('/:id', [
  param('id').isString().notEmpty()
], async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid product ID', details: errors.array() })
    }

    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        category: true
      }
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /products - Create a new product (protected route)
router.post('/', requireAuth, [
  body('title').trim().notEmpty(),
  body('description').optional().trim(),
  body('price').isFloat({ min: 0 }),
  body('image').optional().custom((value) => {
    if (!value || value.trim() === '') return true
    return /^https?:\/\/.+/.test(value)
  }),
  body('stock').optional().isInt({ min: 0 }),
  body('categoryId').isString().notEmpty()
], async (req: AuthRequest, res: express.Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() })
    }

    const { title, description, price, image, stock = 0, categoryId } = req.body

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        image,
        stock,
        categoryId
      },
      include: {
        category: true
      }
    })

    res.status(201).json(product)
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT /products/:id - Update a product (protected route)
router.put('/:id', requireAuth, [
  param('id').isString().notEmpty(),
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim(),
  body('price').optional().isFloat({ min: 0 }),
  body('image').optional().custom((value) => {
    if (!value || value.trim() === '') return true
    return /^https?:\/\/.+/.test(value)
  }),
  body('stock').optional().isInt({ min: 0 }),
  body('categoryId').optional().isString().notEmpty()
], async (req: AuthRequest, res: express.Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() })
    }

    const { title, description, price, image, stock, categoryId } = req.body

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: req.params.id }
    })

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // If categoryId is provided, verify it exists
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      })

      if (!category) {
        return res.status(404).json({ error: 'Category not found' })
      }
    }

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = parseFloat(price)
    if (image !== undefined) updateData.image = image
    if (stock !== undefined) updateData.stock = stock
    if (categoryId !== undefined) updateData.categoryId = categoryId

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        category: true
      }
    })

    res.json(product)
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE /products/:id - Delete a product (protected route)
router.delete('/:id', requireAuth, [
  param('id').isString().notEmpty()
], async (req: AuthRequest, res: express.Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid product ID', details: errors.array() })
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: req.params.id }
    })

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    await prisma.product.delete({
      where: { id: req.params.id }
    })

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
