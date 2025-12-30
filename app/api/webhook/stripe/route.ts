import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as any,
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId

        if (userId) {
            try {
                // 1. Create the order in Supabase
                // Note: In a real app, you might create the order in PENDING state 
                // during checkout and just update it here. 
                // For simplicity, we'll assume the order was created or we create it now.

                // Let's find if there's an order for this session
                const { data: order, error: orderError } = await supabase
                    .from('orders')
                    .insert({
                        user_id: userId,
                        total: session.amount_total ? session.amount_total / 100 : 0,
                        status: 'PAID',
                    })
                    .select()
                    .single()

                if (orderError) throw orderError

                // 2. Clear the cart
                const { error: cartError } = await supabase
                    .from('cart_items')
                    .delete()
                    .eq('user_id', userId)

                if (cartError) throw cartError

                console.log(`Order ${order.id} created and cart cleared for user ${userId}`)
            } catch (error) {
                console.error('Error processing successful checkout:', error)
                return NextResponse.json({ error: 'Error processing checkout' }, { status: 500 })
            }
        }
    }

    return NextResponse.json({ received: true })
}
