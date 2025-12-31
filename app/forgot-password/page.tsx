'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { toast } from '@/components/ui/Toaster'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) {
            toast.error('Please enter your email address')
            return
        }

        try {
            setLoading(true)

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })

            if (error) throw error

            setSent(true)
            toast.success('Password reset email sent! Check your inbox.')
        } catch (error: any) {
            toast.error(error.message || 'Failed to send reset email')
        } finally {
            setLoading(false)
        }
    }

    if (sent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Check your email</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            Didn't receive the email? Check your spam folder or{' '}
                            <button
                                onClick={() => setSent(false)}
                                className="text-primary-600 hover:text-primary-500 font-medium"
                            >
                                try again
                            </button>
                        </p>
                    </div>
                    <div className="text-center">
                        <Link href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                            ← Back to login
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field mt-1"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Sending...' : 'Send reset link'}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                            ← Back to login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
