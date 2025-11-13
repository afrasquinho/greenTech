import mongoose, { Schema, Document } from 'mongoose'

export interface IArticle extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  author: mongoose.Types.ObjectId
  category: 'tech' | 'tutorial' | 'news' | 'best-practices' | 'case-study'
  tags: string[]
  featured: boolean
  published: boolean
  publishedAt?: Date
  coverImage?: string
  readTime: number
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}

const ArticleSchema = new Schema<IArticle>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['tech', 'tutorial', 'news', 'best-practices', 'case-study'],
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  coverImage: {
    type: String,
    trim: true
  },
  readTime: {
    type: Number,
    default: 5,
    min: 1
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Indexes
ArticleSchema.index({ slug: 1 })
ArticleSchema.index({ published: 1, publishedAt: -1 })
ArticleSchema.index({ category: 1 })
ArticleSchema.index({ featured: 1 })
ArticleSchema.index({ tags: 1 })

export default mongoose.model<IArticle>('Article', ArticleSchema)

