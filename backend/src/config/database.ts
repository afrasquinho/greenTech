import mongoose from 'mongoose'

export async function connectDatabase() {
  try {
    // Read MONGODB_URI inside function (after dotenv.config() is called)
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/greentech'
    
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️  MONGODB_URI not found in environment variables, using fallback')
    }
    
    console.log('🔗 Connecting to MongoDB:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')) // Hide password in logs
    
    // Set connection options with timeout
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
    }
    
    await mongoose.connect(MONGODB_URI, options)
    console.log('✅ MongoDB connected successfully')
    console.log('📍 Database:', mongoose.connection.db?.databaseName)
    console.log('📍 Connection state:', mongoose.connection.readyState)
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
    })
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected')
    })
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected')
    })
    
    return mongoose.connection
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', {
      message: error.message,
      name: error.name,
      code: error.code
    })
    throw error
  }
}

export async function disconnectDatabase() {
  try {
    await mongoose.disconnect()
    console.log('✅ MongoDB disconnected')
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error)
  }
}
