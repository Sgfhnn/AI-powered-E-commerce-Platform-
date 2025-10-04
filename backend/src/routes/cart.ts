import express from 'express'
import { body, param, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = express.Router()

// GET /cart - Get user's cart items
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user!.userId },
      include: {
        product: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.product.price.toString()) * item.quantity)
    }, 0)

    res.json({
      items: cartItems,
      total: total.toFixed(2)
    })
  } catch (error) {
    console.error('Get cart error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /cart - Add item to cart
router.post('/', requireAuth, [
  body('productId').isString().notEmpty(),
  body('quantity').optional().isInt({ min: 1 }).toInt()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() })
    }

    const { productId, quantity = 1 } = req.body

    // Verify product exists and has stock
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' })
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user!.userId,
          productId
        }
      }
    })

    let cartItem

    if (existingCartItem) {
      // Update quantity if item already exists
      const newQuantity = existingCartItem.quantity + quantity
      
      if (product.stock < newQuantity) {
        return res.status(400).json({ error: 'Insufficient stock' })
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity },
        include: {
          product: {
            include: {
              category: true
            }
          }
        }
      })
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: req.user!.userId,
          productId,
          quantity
        },
        include: {
          product: {
            include: {
              category: true
            }
          }
        }
      })
    }

    res.json(cartItem)
  } catch (error) {
    console.error('Add to cart error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT /cart/:id - Update cart item quantity
router.put('/:id', requireAuth, [
  param('id').isString().notEmpty(),
  body('quantity').isInt({ min: 1 })
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid input', details: errors.array() })
    }

    const { quantity } = req.body

    // Check if cart item exists and belongs to user
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.userId
      },
      include: {
        product: true
      }
    })

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' })
    }

    // Check stock availability
    if (cartItem.product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' })
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id: req.params.id },
      data: { quantity },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    })

    res.json(updatedCartItem)
  } catch (error) {
    console.error('Update cart item error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE /cart/:id - Remove item from cart
router.delete('/:id', requireAuth, [
  param('id').isString().notEmpty()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid cart item ID', details: errors.array() })
    }

    // Check if cart item exists and belongs to user
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.userId
      }
    })

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' })
    }

    await prisma.cartItem.delete({
      where: { id: req.params.id }
    })

    res.json({ message: 'Item removed from cart' })
  } catch (error) {
    console.error('Remove cart item error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
