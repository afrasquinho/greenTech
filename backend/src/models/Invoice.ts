import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IInvoice extends Document {
  invoiceNumber: string
  user: Types.ObjectId
  project?: Types.ObjectId
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  subtotal: number
  tax: number
  total: number
  currency: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  dueDate: Date
  paidAt?: Date
  payment?: Types.ObjectId
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const InvoiceSchema = new Schema<IInvoice>({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
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
  items: [{
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
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
    enum: ['draft', 'sent', 'paid', 'overdue', 'cancelled'],
    default: 'draft',
    index: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  paidAt: {
    type: Date
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
})

// Generate invoice number
InvoiceSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model('Invoice').countDocuments()
    const year = new Date().getFullYear()
    this.invoiceNumber = `INV-${year}-${String(count + 1).padStart(5, '0')}`
  }
  next()
})

// Indexes
InvoiceSchema.index({ user: 1, status: 1, createdAt: -1 })
InvoiceSchema.index({ invoiceNumber: 1 })
InvoiceSchema.index({ dueDate: 1, status: 1 })

export default mongoose.model<IInvoice>('Invoice', InvoiceSchema)

