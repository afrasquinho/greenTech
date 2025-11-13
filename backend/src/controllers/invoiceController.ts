import { Request, Response } from 'express'
import Invoice from '../models/Invoice'
import Payment from '../models/Payment'

// Get user invoices
export async function getUserInvoices(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { status, limit = 50 } = req.query

    const filter: any = { user: userId }
    if (status) filter.status = status

    const invoices = await Invoice.find(filter)
      .populate('project', 'name')
      .populate('payment')
      .sort({ createdAt: -1 })
      .limit(Number(limit))

    res.json({
      success: true,
      invoices
    })
  } catch (error: any) {
    console.error('Get user invoices error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get single invoice
export async function getInvoice(req: Request, res: Response) {
  try {
    const { id } = req.params
    const userId = (req as any).user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const invoice = await Invoice.findOne({ _id: id, user: userId })
      .populate('project', 'name description')
      .populate('payment')
      .populate('user', 'name email company')

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' })
    }

    res.json({
      success: true,
      invoice
    })
  } catch (error: any) {
    console.error('Get invoice error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Create invoice (admin)
export async function createInvoice(req: Request, res: Response) {
  try {
    const { userId, projectId, items, taxRate = 0.23, dueDays = 30, notes } = req.body

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields: userId, items' })
    }

    const subtotal = items.reduce((sum: number, item: any) => 
      sum + (item.quantity * item.unitPrice), 0
    )
    const tax = subtotal * taxRate
    const total = subtotal + tax

    const invoice = await Invoice.create({
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
      currency: 'EUR',
      status: 'draft',
      dueDate: new Date(Date.now() + dueDays * 24 * 60 * 60 * 1000),
      notes
    })

    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate('user', 'name email')
      .populate('project', 'name')

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      invoice: populatedInvoice
    })
  } catch (error: any) {
    console.error('Create invoice error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update invoice status
export async function updateInvoiceStatus(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ error: 'Status is required' })
    }

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { status, paidAt: status === 'paid' ? new Date() : undefined },
      { new: true, runValidators: true }
    )
      .populate('user', 'name email')
      .populate('project', 'name')

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' })
    }

    res.json({
      success: true,
      message: 'Invoice status updated',
      invoice
    })
  } catch (error: any) {
    console.error('Update invoice status error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Admin: Get all invoices
export async function getAllInvoices(req: Request, res: Response) {
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

    const [invoices, total] = await Promise.all([
      Invoice.find(filter)
        .populate('user', 'name email company')
        .populate('project', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Invoice.countDocuments(filter)
    ])

    // Calculate totals
    const totals = await Invoice.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' }, count: { $sum: 1 } } }
    ])

    res.json({
      success: true,
      invoices,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      },
      stats: {
        totalPaid: totals[0]?.total || 0,
        totalInvoices: totals[0]?.count || 0
      }
    })
  } catch (error: any) {
    console.error('Get all invoices error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Delete invoice (admin only)
export async function deleteInvoice(req: Request, res: Response) {
  try {
    const { id } = req.params

    const invoice = await Invoice.findByIdAndDelete(id)

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' })
    }

    res.json({
      success: true,
      message: 'Invoice deleted successfully'
    })
  } catch (error: any) {
    console.error('Delete invoice error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

