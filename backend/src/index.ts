import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRoutes from './routes/chatRoutes'
import contactRoutes from './routes/contactRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', chatRoutes)
app.use('/api', contactRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'GreenTech Solutions API - Working!' })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 OpenAI API: ${process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ Not configured - using mock responses'}`)
})
