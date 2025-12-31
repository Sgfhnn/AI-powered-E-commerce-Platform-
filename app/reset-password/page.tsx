'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { toast } from '@/components/ui/Toaster'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [validSession, setValidSession] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Check if user came from a valid reset link
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                setValidSession(true)
            }
        }
        checkSession()

        // Listen for auth state changes (when user clicks the reset link)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                setValidSession(true)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!password || !confirmPassword) {
            toast.error('Please fill in all fields')
            return
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        try {
            setLoading(true)

            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            toast.success('Password updated successfully!')
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message || 'Failed to reset password')
        } finally {
            setLoading(false)
        }
    }

    if (!validSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Invalid or expired link</h2>
                    <p className="text-gray-600">
                        This password reset link is invalid or has expired. Please request a new one.
                    </p>
                    <a href="/forgot-password" className="btn-primary inline-block">
                        Request new link
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Set new password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your new password below.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field mt-1"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input-field mt-1"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Updating...' : 'Update password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
