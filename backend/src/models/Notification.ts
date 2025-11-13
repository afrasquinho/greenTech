import mongoose, { Schema, Document } from 'mongoose'

export interface INotification extends Document {
  user: mongoose.Types.ObjectId
  type: 'project_update' | 'message' | 'system' | 'reminder'
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: Date
  readAt?: Date
}

const NotificationSchema = new Schema<INotification>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['project_update', 'message', 'system', 'reminder'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    trim: true
  },
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true
})

// Indexes for efficient queries
NotificationSchema.index({ user: 1, read: 1, createdAt: -1 })
NotificationSchema.index({ user: 1, createdAt: -1 })

export default mongoose.model<INotification>('Notification', NotificationSchema)

