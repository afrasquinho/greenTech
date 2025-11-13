import { Request, Response } from 'express'
import Payment from '../models/Payment'
import Invoice from '../models/Invoice'
import { createPaymentIntent, handleStripeWebhook, getPaymentStatus } from '../services/stripeService'

// Create payment intent
export async function createPayment(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { amount, currency, projectId, description, items } = req.body

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' })
    }

    if (!description) {
      return res.status(400).json({ error: 'Description is required' })
    }

    // Create invoice if items provided
    let invoice = null
    if (items && items.length > 0) {
      const subtotal = items.reduce((sum: number, item: any) => 
        sum + (item.quantity * item.unitPrice), 0
      )
      const tax = subtotal * 0.23 // 23% VAT
      const total = subtotal + tax

      invoice = await Invoice.create({
        user: userId,
        project: projectId,
        items: items.map((item: any) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice
        })),
        subtotal,
        tax,
        total,
        currency: currency || 'EUR',
        status: 'draft',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      })
    }

    // Create payment intent
    const result = await createPaymentIntent({
      amount: invoice ? invoice.total : amount,
      currency: currency || 'EUR',
      userId,
      projectId,
      description: invoice ? `Invoice ${invoice.invoiceNumber}` : description,
      metadata: {
        invoiceId: invoice ? String(invoice._id) : '',
      }
    })

    res.json({
      success: true,
      clientSecret: result.paymentIntent.clientSecret,
      paymentId: result.payment.id,
      invoiceNumber: result.payment.invoiceNumber,
      invoice: invoice ? {
        id: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        total: invoice.total
      } : null
    })
  } catch (error: any) {
    console.error('Create payment error:', error)
    res.status(500).json({ error: error.message || 'Failed to create payment' })
  }
}

// Webhook handler for Stripe
export async function stripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature']

  if (!sig) {
    return res.status(400).send('Missing stripe-signature header')
  }

  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret || '')
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    await handleStripeWebhook(event)

    res.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: error.message })
  }
}

// Get user payments
export async function getUserPayments(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { status, limit = 50 } = req.query

    const filter: any = { user: userId }
    if (status) filter.status = status

    const payments = await Payment.find(filter)
      .populate('project', 'name')
      .sort({ createdAt: -1 })
      .limit(Number(limit))

    res.json({
      success: true,
      payments
    })
  } catch (error: any) {
    console.error('Get user payments error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get payment status
export async function getPayment(req: Request, res: Response) {
  try {
    const { id } = req.params
    const userId = (req as any).user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const payment = await Payment.findOne({ _id: id, user: userId })
      .populate('project', 'name description')

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' })
    }

    // If it's a Stripe payment, get latest status
    if (payment.stripePaymentIntentId) {
      try {
        const stripeStatus = await getPaymentStatus(payment.stripePaymentIntentId)
        if (stripeStatus.status !== payment.status) {
          payment.status = stripeStatus.status as any
          await payment.save()
        }
      } catch (error) {
        // Ignore errors, use database status
      }
    }

    res.json({
      success: true,
      payment
    })
  } catch (error: any) {
    console.error('Get payment error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Admin: Get all payments
export async function getAllPayments(req: Request, res: Response) {
  try {
    const { page = 1, limit = 50, status, userId, startDate, endDate } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const filter: any = {}
    if (status) filter.status = status
    if (userId) filter.user = userId
    if (startDate || endDate) {
      filter.createdAt = {}
      if (startDate) filter.createdAt.$gte = new Date(startDate as string)
      if (endDate) filter.createdAt.$lte = new Date(endDate as string)
    }

    const [payments, total] = await Promise.all([
      Payment.find(filter)
        .populate('user', 'name email')
        .populate('project', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Payment.countDocuments(filter)
    ])

    // Calculate totals
    const totals = await Payment.aggregate([
      { $match: { status: 'succeeded' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ])

    res.json({
      success: true,
      payments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      },
      stats: {
        totalRevenue: totals[0]?.total || 0,
        totalTransactions: totals[0]?.count || 0
      }
    })
  } catch (error: any) {
    console.error('Get all payments error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

