import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/greentech'

export async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ MongoDB connected successfully')
    return mongoose.connection
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
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
