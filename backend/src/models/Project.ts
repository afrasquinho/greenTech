import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId
  name: string
  description: string
  type: 'software' | 'qa' | 'career' | 'other'
  status: 'draft' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  budget?: number
  startDate?: Date
  endDate?: Date
  tags?: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['software', 'qa', 'career', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'in_progress', 'completed', 'on_hold', 'cancelled'],
    default: 'draft'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  budget: {
    type: Number,
    min: 0
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

// Index for faster queries
ProjectSchema.index({ userId: 1, status: 1 })
ProjectSchema.index({ userId: 1, type: 1 })

export default mongoose.model<IProject>('Project', ProjectSchema)

