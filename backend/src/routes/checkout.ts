import express from 'express'
import { query, validationResult } from 'express-validator'
import { prisma } from '../lib/prisma'
import { requireAuth, AuthRequest } from '../middleware/auth'
import { stripe, formatAmountForStripe } from '../lib/stripe'

const router = express.Router()

// POST /checkout - Create Stripe checkout session
router.post('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    // Get user's cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user!.userId },
      include: {
        product: true
      }
    })

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    // Calculate total and prepare line items for Stripe
    let total = 0
    const lineItems = []

    for (const item of cartItems) {
      const itemTotal = parseFloat(item.product.price.toString()) * item.quantity
      total += itemTotal

      // Check stock availability
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${item.product.title}` })
      }

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
            description: item.product.description || undefined,
            images: item.product.image ? [item.product.image] : undefined,
          },
          unit_amount: formatAmountForStripe(parseFloat(item.product.price.toString())),
        },
        quantity: item.quantity,
      })
    }

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: req.user!.userId,
        total: total,
        status: 'PENDING',
        orderItems: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      }
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order.id,
        userId: req.user!.userId,
      },
    })

    // Update order with Stripe payment ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripePaymentId: session.id }
    })

    res.json({
      sessionId: session.id,
      url: session.url,
      orderId: order.id
    })
  } catch (error) {
    console.error('Checkout error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /checkout/success - Handle successful payment
router.get('/success', requireAuth, [
  query('session_id').isString().notEmpty()
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Session ID is required', details: errors.array() })
    }

    const sessionId = req.query.session_id as string

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      // Find the order by Stripe payment ID
      const order = await prisma.order.findFirst({
        where: {
          stripePaymentId: sessionId,
          userId: req.user!.userId
        },
        include: {
          orderItems: {
            include: {
              product: true
            }
          }
        }
      })

      if (order && order.status === 'PENDING') {
        // Update order status to PAID
        await prisma.order.update({
          where: { id: order.id },
          data: { status: 'PAID' }
        })

        // Update product stock
        for (const item of order.orderItems) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity
              }
            }
          })
        }

        // Clear user's cart
        await prisma.cartItem.deleteMany({
          where: { userId: req.user!.userId }
        })

        return res.json({
          success: true,
          order: order,
          message: 'Payment successful! Your order has been confirmed.'
        })
      }
    }

    res.json({
      success: false,
      message: 'Payment not completed or order not found.'
    })
  } catch (error) {
    console.error('Checkout success error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
