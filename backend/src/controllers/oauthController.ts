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
      console.error('GitHub OAuth callback: No user in request')
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
      return res.redirect(`${frontendUrl}/?error=oauth_failed&reason=no_user`)
    }

    console.log('GitHub OAuth callback: User found', {
      id: user._id,
      email: user.email,
      name: user.name
    })

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email || `${user.oauthId}@github.local`,
      role: user.role
    })

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/auth/callback?token=${token}&provider=github`)
  } catch (error: any) {
    console.error('GitHub OAuth callback error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      user: req.user
    })
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/?error=oauth_failed&reason=${encodeURIComponent(error.message || 'unknown')}`)
  }
}

