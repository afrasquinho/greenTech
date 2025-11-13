import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import User from '../models/User'
import { generateToken } from '../utils/jwt'

// Google OAuth Strategy (only if configured)
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

if (googleClientId && googleClientSecret && 
    googleClientSecret !== 'CONFIGURAR_GOOGLE_CLIENT_SECRET' &&
    googleClientId !== '') {
  passport.use(
    'google',
    new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback'
    },
    async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
      try {
        let user = await User.findOne({
          $or: [
            { email: profile.emails?.[0]?.value },
            { oauthId: profile.id, oauthProvider: 'google' }
          ]
        })

        if (user) {
          // Update OAuth info if not set
          if (!user.oauthProvider) {
            user.oauthProvider = 'google'
            user.oauthId = profile.id
            if (!user.name && profile.displayName) {
              user.name = profile.displayName
            }
            await user.save()
          }
        } else {
          // Create new user
          user = await User.create({
            name: profile.displayName || profile.emails?.[0]?.value?.split('@')[0] || 'User',
            email: profile.emails?.[0]?.value || '',
            oauthProvider: 'google',
            oauthId: profile.id,
            role: 'client'
          })
        }

        return done(null, user)
      } catch (error: any) {
        return done(error)
      }
    }
  )
  )
  console.log('✅ Google OAuth strategy configured')
} else {
  console.log('⚠️  Google OAuth not configured - skipping')
}

// GitHub OAuth Strategy (only if configured)
const githubClientId = process.env.GITHUB_CLIENT_ID
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET

if (githubClientId && githubClientSecret && 
    githubClientSecret !== 'CONFIGURAR_GITHUB_CLIENT_SECRET' &&
    githubClientId !== '') {
  passport.use(
    'github',
    new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: process.env.GITHUB_CALLBACK_URL || '/api/auth/github/callback'
    },
    async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
      try {
        let user = await User.findOne({
          $or: [
            { email: profile.emails?.[0]?.value },
            { oauthId: profile.id.toString(), oauthProvider: 'github' }
          ]
        })

        if (user) {
          // Update OAuth info if not set
          if (!user.oauthProvider) {
            user.oauthProvider = 'github'
            user.oauthId = profile.id.toString()
            if (!user.name && profile.displayName) {
              user.name = profile.displayName
            }
            await user.save()
          }
        } else {
          // Create new user
          user = await User.create({
            name: profile.displayName || profile.username || 'User',
            email: profile.emails?.[0]?.value || `${profile.username}@github.local`,
            oauthProvider: 'github',
            oauthId: profile.id.toString(),
            role: 'client'
          })
        }

        return done(null, user)
      } catch (error: any) {
        console.error('Passport GitHub Strategy error:', error)
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          profile: profile ? { id: profile.id, email: profile.emails?.[0]?.value } : null
        })
        return done(error)
      }
    }
  )
  )
  console.log('✅ GitHub OAuth strategy configured')
} else {
  console.log('⚠️  GitHub OAuth not configured - skipping')
}

// Serialize user for session
passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user._id)
})

passport.deserializeUser(async (id: string, done: (err: any, user?: any) => void) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

export default passport

