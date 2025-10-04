import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Redirect to success page with session ID
    // The actual payment processing is handled by the backend
    return NextResponse.redirect(
      new URL(`/checkout/success?session_id=${sessionId}`, request.url)
    )
  } catch (error) {
    console.error('Checkout success error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
