'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/contexts/CartContext'

export default function SuccessPage() {
    const { clearCart } = useCart()

    useEffect(() => {
        // Clear the local cart state as well
        clearCart()
    }, [clearCart])

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircleIcon className="h-24 w-24 text-green-500" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>
                <p className="text-gray-600 mb-8 text-lg">
                    Thank you for your purchase. Your order has been placed successfully and is being processed.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/orders"
                        className="block w-full btn-primary py-3"
                    >
                        View My Orders
                    </Link>
                    <Link
                        href="/products"
                        className="block w-full btn-outline py-3"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}
