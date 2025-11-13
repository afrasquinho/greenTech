import express from 'express'
import {
  getUserInvoices,
  getInvoice,
  createInvoice,
  updateInvoiceStatus,
  getAllInvoices,
  deleteInvoice
} from '../controllers/invoiceController'
import { authenticate } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// User routes
router.get('/', getUserInvoices)
router.get('/:id', getInvoice)

// Admin routes
router.post('/', requireRole(['admin']), createInvoice)
router.put('/:id/status', requireRole(['admin']), updateInvoiceStatus)
router.get('/admin/all', requireRole(['admin']), getAllInvoices)
router.delete('/:id', requireRole(['admin']), deleteInvoice)

export default router

