import { Request, Response } from 'express'
import { generateToken } from '../utils/jwt'

export function googleAuth(req: Request, res: Response) {
  // This will be handled by passport middleware
}

export function googleCallback(req: Request, res: Response) {
  try {
    const user = req.user as any

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/?error=oauth_failed`)
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    })

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/auth/callback?token=${token}&provider=google`)
  } catch (error: any) {
    console.error('Google OAuth callback error:', error)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/?error=oauth_failed`)
  }
}

export function githubAuth(req: Request, res: Response) {
  // This will be handled by passport middleware
}

export function githubCallback(req: Request, res: Response) {
  try {
    const user = req.user as any

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/?error=oauth_failed`)
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    })

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/auth/callback?token=${token}&provider=github`)
  } catch (error: any) {
    console.error('GitHub OAuth callback error:', error)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/?error=oauth_failed`)
  }
}

