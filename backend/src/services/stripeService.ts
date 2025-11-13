import Stripe from 'stripe'
import mongoose from 'mongoose'
import Payment from '../models/Payment'
import Invoice from '../models/Invoice'
import { createNotification } from '../controllers/notificationController'

if (!process.env.STRIPE_SECRET_KEY) {
  console.log('⚠️  Stripe secret key not configured - payment features will be disabled')
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia' as any,
    })
  : null

export async function createPaymentIntent(data: {
  amount: number
  currency: string
  userId: string
  projectId?: string
  description: string
  metadata?: Record<string, any>
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured')
  }

  try {
    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: data.currency.toLowerCase(),
      description: data.description,
      metadata: {
        userId: data.userId,
        projectId: data.projectId || '',
        ...data.metadata
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Create payment record
    const payment = await Payment.create({
      user: data.userId,
      project: data.projectId,
      amount: data.amount,
      currency: data.currency,
      status: 'pending',
      paymentMethod: 'stripe',
      stripePaymentIntentId: paymentIntent.id,
      invoiceNumber: '', // Will be auto-generated
      description: data.description,
      metadata: data.metadata
    })

    return {
      paymentIntent: {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      },
      payment: {
        id: payment._id,
        invoiceNumber: payment.invoiceNumber,
      }
    }
  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    throw new Error(error.message || 'Failed to create payment intent')
  }
}

export async function handleStripeWebhook(event: Stripe.Event) {
  if (!stripe) {
    throw new Error('Stripe is not configured')
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (error: any) {
    console.error('Error handling webhook:', error)
    throw error
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const payment = await Payment.findOne({
    stripePaymentIntentId: paymentIntent.id
  })

  if (!payment) {
    console.error('Payment not found for PaymentIntent:', paymentIntent.id)
    return
  }

  // Update payment status
  payment.status = 'succeeded'
  payment.stripeChargeId = paymentIntent.latest_charge as string
  payment.paidAt = new Date()
  await payment.save()

  // Update associated invoice if exists
  const invoice = await Invoice.findOne({ payment: payment._id })
  if (invoice) {
    invoice.status = 'paid'
    invoice.paidAt = new Date()
    invoice.payment = payment._id as mongoose.Types.ObjectId
    await invoice.save()
  }

  // Create notification
  await createNotification({
    user: payment.user.toString(),
    type: 'system',
    title: 'Pagamento Confirmado',
    message: `O teu pagamento de €${payment.amount} foi confirmado com sucesso.`,
    link: '/dashboard'
  })

  console.log('✅ Payment succeeded:', payment.invoiceNumber)
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const payment = await Payment.findOne({
    stripePaymentIntentId: paymentIntent.id
  })

  if (!payment) {
    console.error('Payment not found for PaymentIntent:', paymentIntent.id)
    return
  }

  payment.status = 'failed'
  await payment.save()

  // Create notification
  await createNotification({
    user: payment.user.toString(),
    type: 'system',
    title: 'Pagamento Falhou',
    message: `O teu pagamento de €${payment.amount} falhou. Por favor, tenta novamente.`,
    link: '/dashboard'
  })

  console.log('❌ Payment failed:', payment.invoiceNumber)
}

export async function getPaymentStatus(paymentIntentId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured')
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    
    const payment = await Payment.findOne({
      stripePaymentIntentId: paymentIntentId
    })

    return {
      status: paymentIntent.status,
      payment: payment ? {
        id: payment._id,
        invoiceNumber: payment.invoiceNumber,
        amount: payment.amount,
        status: payment.status
      } : null
    }
  } catch (error: any) {
    console.error('Error retrieving payment status:', error)
    throw new Error('Failed to retrieve payment status')
  }
}

export { stripe }

