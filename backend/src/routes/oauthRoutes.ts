import express from 'express'
import passport from '../config/passport'
import { googleAuth, googleCallback, githubAuth, githubCallback } from '../controllers/oauthController'

const router = express.Router()

// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  googleCallback
)

// GitHub OAuth
router.get(
  '/github',
  (req, res, next) => {
    // Check if GitHub OAuth is configured
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
      console.error('GitHub OAuth not configured - missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET')
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
      return res.redirect(`${frontendUrl}/?error=oauth_not_configured`)
    }
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next)
  }
)

router.get(
  '/github/callback',
  (req, res, next) => {
    // Check if GitHub OAuth is configured
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
      console.error('GitHub OAuth not configured - missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET')
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
      return res.redirect(`${frontendUrl}/?error=oauth_not_configured`)
    }
    
    passport.authenticate('github', { session: false }, (err: any, user: any, info: any) => {
      if (err) {
        console.error('Passport GitHub authentication error:', err)
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
        return res.redirect(`${frontendUrl}/?error=oauth_failed&reason=auth_error`)
      }
      if (!user) {
        console.error('Passport GitHub: No user returned', info)
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
        return res.redirect(`${frontendUrl}/?error=oauth_failed&reason=no_user`)
      }
      req.user = user
      next()
    })(req, res, next)
  },
  githubCallback
)

export default router

