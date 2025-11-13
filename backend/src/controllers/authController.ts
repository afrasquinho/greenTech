import { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword, comparePassword } from '../utils/password'
import { generateToken } from '../utils/jwt'

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, company } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, password'
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      company,
      role: 'client'
    })

    // Generate token
    const token = generateToken({
      userId: String(user._id),
      email: user.email,
      role: user.role
    })

    console.log('✅ User registered:', user.email)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company
      }
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields: email, password'
      })
    }

    // Find user with password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Check if user has password (not OAuth only)
    if (!user.password) {
      return res.status(401).json({
        error: 'This account uses OAuth login. Please use Google or GitHub to sign in.'
      })
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Generate token
    const token = generateToken({
      userId: String(user._id),
      email: user.email,
      role: user.role
    })

    console.log('✅ User logged in:', user.email)

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company
      }
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const user = await User.findById(req.user?.userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      success: true,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        oauthProvider: user.oauthProvider
      }
    })
  } catch (error: any) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const { name, company } = req.body
    const updates: any = {}

    if (name) updates.name = name
    if (company !== undefined) updates.company = company

    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      updates,
      { new: true, runValidators: true }
    )

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company
      }
    })
  } catch (error: any) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

