import { Request, Response } from 'express'
import User from '../models/User'
import Project from '../models/Project'
import Contact from '../models/Contact'

export async function getDashboardStats(req: Request, res: Response) {
  try {
    const [
      totalUsers,
      totalProjects,
      activeProjects,
      completedProjects,
      totalContacts,
      unreadContacts
    ] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Project.countDocuments({ status: 'in_progress' }),
      Project.countDocuments({ status: 'completed' }),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false })
    ])

    res.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          clients: await User.countDocuments({ role: 'client' }),
          admins: await User.countDocuments({ role: 'admin' })
        },
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects,
          draft: await Project.countDocuments({ status: 'draft' }),
          onHold: await Project.countDocuments({ status: 'on_hold' }),
          cancelled: await Project.countDocuments({ status: 'cancelled' })
        },
        contacts: {
          total: totalContacts,
          unread: unreadContacts
        }
      }
    })
  } catch (error: any) {
    console.error('Get dashboard stats error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getAllClients(req: Request, res: Response) {
  try {
    const { page = 1, limit = 20, search = '' } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const filter: any = { role: 'client' }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ]
    }

    const [clients, total] = await Promise.all([
      User.find(filter)
        .select('-password -__v')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      User.countDocuments(filter)
    ])

    // Get project counts for each client
    const clientsWithProjects = await Promise.all(
      clients.map(async (client) => {
        const projectCount = await Project.countDocuments({ userId: client._id })
        return {
          ...client.toObject(),
          projectCount
        }
      })
    )

    res.json({
      success: true,
      clients: clientsWithProjects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error: any) {
    console.error('Get all clients error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getAllProjects(req: Request, res: Response) {
  try {
    const { page = 1, limit = 20, status, type, userId } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const filter: any = {}
    if (status) filter.status = status
    if (type) filter.type = type
    if (userId) filter.userId = userId

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .populate('userId', 'name email company')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Project.countDocuments(filter)
    ])

    res.json({
      success: true,
      projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error: any) {
    console.error('Get all projects error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateProjectStatus(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ error: 'Status is required' })
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('userId', 'name email')

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json({
      success: true,
      message: 'Project status updated successfully',
      project
    })
  } catch (error: any) {
    console.error('Update project status error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getAllContacts(req: Request, res: Response) {
  try {
    const { page = 1, limit = 20, read, search = '' } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const filter: any = {}
    if (read !== undefined) filter.read = read === 'true'
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }

    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Contact.countDocuments(filter)
    ])

    res.json({
      success: true,
      contacts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error: any) {
    console.error('Get all contacts error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function markContactAsRead(req: Request, res: Response) {
  try {
    const { id } = req.params

    const contact = await Contact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    )

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' })
    }

    res.json({
      success: true,
      message: 'Contact marked as read',
      contact
    })
  } catch (error: any) {
    console.error('Mark contact as read error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function deleteContact(req: Request, res: Response) {
  try {
    const { id } = req.params

    const contact = await Contact.findByIdAndDelete(id)

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' })
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    })
  } catch (error: any) {
    console.error('Delete contact error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

