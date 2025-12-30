// Frontend Stripe utilities
export const formatAmountForDisplay = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100) // Convert to cents
}

// Stripe publishable key for frontend use
export const getStripePublishableKey = (): string => {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
}

// Utility to check if Stripe is properly configured
export const isStripeConfigured = (): boolean => {
  return Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
}
