import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Proxy to backend API - let backend handle authentication and database
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
    const response = await fetch(`${backendUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Forward the response with cookies if any
    const nextResponse = NextResponse.json(data, { status: response.status })

    // If backend sets cookies, forward them
    const setCookies = response.headers.get('set-cookie')
    if (setCookies) {
      nextResponse.headers.set('set-cookie', setCookies)
    }

    return nextResponse
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
