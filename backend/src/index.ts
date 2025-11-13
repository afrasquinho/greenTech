import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// Load environment variables FIRST
dotenv.config()

// Import routes and passport AFTER dotenv.config()
import chatRoutes from './routes/chatRoutes'
import contactRoutes from './routes/contactRoutes'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'
import oauthRoutes from './routes/oauthRoutes'
import adminRoutes from './routes/adminRoutes'
import articleRoutes from './routes/articleRoutes'
import notificationRoutes from './routes/notificationRoutes'
import paymentRoutes from './routes/paymentRoutes'
import invoiceRoutes from './routes/invoiceRoutes'
import { connectDatabase } from './config/database'
import passport from './config/passport'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// Stripe webhook needs raw body
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

// Routes
app.use('/api', chatRoutes)
app.use('/api', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/auth', oauthRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/invoices', invoiceRoutes)

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: 'GreenTech Solutions API - Working!' })
})

// Health check
app.get('/health', (req: express.Request, res: express.Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: dbStatus,
    dbReadyState: mongoose.connection.readyState
  })
})

// Start server
async function startServer() {
  // Connect to MongoDB (non-blocking)
  if (process.env.MONGODB_URI) {
    console.log('🔄 Connecting to MongoDB...')
    connectDatabase().catch((error) => {
      console.error('❌ Failed to connect to MongoDB:', error.message)
      console.log('⚠️  Server will continue without database connection')
    })
  } else {
    console.log('⚠️  MongoDB URI not configured - skipping database connection')
  }

  // Start server immediately (don't wait for MongoDB)
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📡 OpenAI API: ${process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ Not configured - using mock responses'}`)
    console.log(`📦 MongoDB: ${process.env.MONGODB_URI ? '🔄 Connecting...' : '⚠️  Not configured'}`)
  })
}

startServer()
