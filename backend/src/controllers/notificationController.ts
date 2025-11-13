import { Request, Response } from 'express'
import Notification from '../models/Notification'

// Extend Express Request to include user (same as in middleware/auth)
interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
    role: string
  }
}

export async function getUserNotifications(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { limit = 50, unreadOnly } = req.query

    const filter: any = { user: userId }
    if (unreadOnly === 'true') {
      filter.read = false
    }

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))

    const unreadCount = await Notification.countDocuments({
      user: userId,
      read: false
    })

    res.json({
      success: true,
      notifications,
      unreadCount
    })
  } catch (error: any) {
    console.error('Get user notifications error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function markAsRead(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId
    const { id } = req.params

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: userId },
      { read: true, readAt: new Date() },
      { new: true }
    )

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' })
    }

    res.json({
      success: true,
      message: 'Notification marked as read',
      notification
    })
  } catch (error: any) {
    console.error('Mark notification as read error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function markAllAsRead(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    await Notification.updateMany(
      { user: userId, read: false },
      { read: true, readAt: new Date() }
    )

    res.json({
      success: true,
      message: 'All notifications marked as read'
    })
  } catch (error: any) {
    console.error('Mark all notifications as read error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function deleteNotification(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.userId
    const { id } = req.params

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const notification = await Notification.findOneAndDelete({
      _id: id,
      user: userId
    })

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' })
    }

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    })
  } catch (error: any) {
    console.error('Delete notification error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Helper function to create notifications (can be called from other controllers)
export async function createNotification(data: {
  user: string
  type: 'project_update' | 'message' | 'system' | 'reminder'
  title: string
  message: string
  link?: string
}) {
  try {
    const notification = await Notification.create(data)
    return notification
  } catch (error) {
    console.error('Create notification error:', error)
    return null
  }
}

