import express from 'express'
import { prisma } from '../lib/prisma'
import { requireAuth, AuthRequest } from '../middleware/auth'

const router = express.Router()

// GET /orders - Get user's orders
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.userId },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json({ orders })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT /orders/:id/cancel - Cancel an order
router.put('/:id/cancel', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const userId = req.user!.userId

    // Check if order exists and belongs to user
    const order = await prisma.order.findFirst({
      where: {
        id: id,
        userId: userId
      }
    })

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    // Check if order can be cancelled (only PENDING orders)
    if (order.status !== 'PENDING') {
      return res.status(400).json({ error: 'Order cannot be cancelled' })
    }

    // Update order status to CANCELLED
    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { status: 'CANCELLED' }
    })

    res.json({ 
      message: 'Order cancelled successfully',
      order: updatedOrder 
    })
  } catch (error) {
    console.error('Cancel order error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
