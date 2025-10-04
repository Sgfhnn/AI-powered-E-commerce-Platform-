import { Request, Response, NextFunction } from 'express'
import { getUserFromRequest, AuthRequest } from '../lib/auth'

export { AuthRequest }

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = getUserFromRequest(req)
  
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized - Please log in' })
  }
  
  req.user = user
  next()
}

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = getUserFromRequest(req)
  req.user = user || undefined
  next()
}
