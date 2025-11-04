import mongoose, { Schema, Document } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  company?: string
  service: string
  message: string
  createdAt: Date
  read: boolean
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  company: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: true,
    enum: ['software', 'qa', 'career', 'other']
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model<IContact>('Contact', ContactSchema)
