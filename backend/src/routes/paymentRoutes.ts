import express from 'express'
import {
  createPayment,
  stripeWebhook,
  getUserPayments,
  getPayment,
  getAllPayments
} from '../controllers/paymentController'
import { authenticate } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Webhook (no auth, Stripe signs the request)
router.post('/webhook', stripeWebhook)

// User routes (require authentication)
router.use(authenticate)

router.post('/create', createPayment)
router.get('/', getUserPayments)
router.get('/:id', getPayment)

// Admin routes
router.get('/admin/all', requireRole(['admin']), getAllPayments)

export default router

