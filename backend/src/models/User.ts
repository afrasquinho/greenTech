import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  role: 'admin' | 'client'
  company?: string
  oauthProvider?: 'google' | 'github'
  oauthId?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    select: false // Não retornar password por padrão
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client'
  },
  company: {
    type: String,
    trim: true
  },
  oauthProvider: {
    type: String,
    enum: ['google', 'github']
  },
  oauthId: {
    type: String
  }
}, {
  timestamps: true
})

export default mongoose.model<IUser>('User', UserSchema)
