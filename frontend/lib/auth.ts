// Frontend authentication utilities - CLIENT SIDE ONLY
export interface JWTPayload {
  userId: string
  email: string
}

// Simple token management for frontend
export function getStoredToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

export function setStoredToken(token: string | null): void {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }
}

export function getUserFromToken(): JWTPayload | null {
  const token = getStoredToken()
  if (!token) return null

  try {
    // Basic JWT decode (you might want to use a proper JWT library for production)
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload as JWTPayload
  } catch (error) {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getStoredToken() !== null && getUserFromToken() !== null
}

export function logout(): void {
  setStoredToken(null)
}
