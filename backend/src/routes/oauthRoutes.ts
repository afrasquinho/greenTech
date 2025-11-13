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
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/' }),
  githubCallback
)

export default router

