import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IPayment extends Document {
  user: Types.ObjectId
  project?: Types.ObjectId
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded'
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer'
  stripePaymentIntentId?: string
  stripeChargeId?: string
  invoiceNumber: string
  description: string
  metadata?: Record<string, any>
  paidAt?: Date
  createdAt: Date
  updatedAt: Date
}

const PaymentSchema = new Schema<IPayment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'EUR',
    uppercase: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'succeeded', 'failed', 'refunded'],
    default: 'pending',
    index: true
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'bank_transfer'],
    required: true
  },
  stripePaymentIntentId: {
    type: String,
    sparse: true,
    unique: true
  },
  stripeChargeId: {
    type: String,
    sparse: true
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  metadata: {
    type: Schema.Types.Mixed
  },
  paidAt: {
    type: Date
  }
}, {
  timestamps: true
})

// Generate invoice number
PaymentSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model('Payment').countDocuments()
    const year = new Date().getFullYear()
    this.invoiceNumber = `INV-${year}-${String(count + 1).padStart(5, '0')}`
  }
  next()
})

// Indexes
PaymentSchema.index({ user: 1, status: 1, createdAt: -1 })
PaymentSchema.index({ invoiceNumber: 1 })
PaymentSchema.index({ stripePaymentIntentId: 1 })

export default mongoose.model<IPayment>('Payment', PaymentSchema)

