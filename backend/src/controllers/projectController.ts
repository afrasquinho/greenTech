import { Request, Response } from 'express'
import Project from '../models/Project'
import { createNotification } from './notificationController'

export async function getProjects(req: Request, res: Response) {
  try {
    const userId = req.user?.userId
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { status, type } = req.query
    const filter: any = { userId: userId }

    if (status) filter.status = status
    if (type) filter.type = type

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v')

    res.json({
      success: true,
      projects,
      count: projects.length
    })
  } catch (error: any) {
    console.error('Get projects error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getProject(req: Request, res: Response) {
  try {
    const userId = req.user?.userId
    const projectId = req.params.id

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const project = await Project.findOne({ _id: projectId, userId: userId })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json({
      success: true,
      project
    })
  } catch (error: any) {
    console.error('Get project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { name, description, type, status, priority, budget, startDate, endDate, tags, notes } = req.body

    // Validation
    if (!name || !description || !type) {
      return res.status(400).json({
        error: 'Missing required fields: name, description, type'
      })
    }

    const project = await Project.create({
      userId: userId,
      name,
      description,
      type,
      status: status || 'draft',
      priority: priority || 'medium',
      budget,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      tags,
      notes
    })

    // Create notification for user
    await createNotification({
      user: userId,
      type: 'project_update',
      title: 'Novo Projeto Criado',
      message: `O teu projeto "${name}" foi criado com sucesso.`,
      link: `/dashboard`
    })

    console.log('✅ Project created:', project._id)

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    })
  } catch (error: any) {
    console.error('Create project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const userId = req.user?.userId
    const projectId = req.params.id

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const updates: any = {}
    const allowedFields = ['name', 'description', 'type', 'status', 'priority', 'budget', 'startDate', 'endDate', 'tags', 'notes']
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'startDate' || field === 'endDate') {
          updates[field] = req.body[field] ? new Date(req.body[field]) : undefined
        } else {
          updates[field] = req.body[field]
        }
      }
    })

    const oldProject = await Project.findOne({ _id: projectId, userId: userId })
    if (!oldProject) {
      return res.status(404).json({ error: 'Project not found' })
    }

    const project = await Project.findOneAndUpdate(
      { _id: projectId, userId: userId },
      updates,
      { new: true, runValidators: true }
    )

    // Create notification if status changed
    if (updates.status && updates.status !== oldProject.status && project) {
      await createNotification({
        user: userId,
        type: 'project_update',
        title: 'Estado do Projeto Atualizado',
        message: `O estado do projeto "${project.name}" foi alterado para ${updates.status}.`,
        link: `/dashboard`
      })
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      project
    })
  } catch (error: any) {
    console.error('Update project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const userId = req.user?.userId
    const projectId = req.params.id

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const project = await Project.findOneAndDelete({ _id: projectId, userId: userId })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    console.log('✅ Project deleted:', projectId)

    res.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error: any) {
    console.error('Delete project error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getProjectStats(req: Request, res: Response) {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const projects = await Project.find({ userId: userId })

    const stats = {
      total: projects.length,
      byStatus: {
        draft: projects.filter(p => p.status === 'draft').length,
        in_progress: projects.filter(p => p.status === 'in_progress').length,
        completed: projects.filter(p => p.status === 'completed').length,
        on_hold: projects.filter(p => p.status === 'on_hold').length,
        cancelled: projects.filter(p => p.status === 'cancelled').length
      },
      byType: {
        software: projects.filter(p => p.type === 'software').length,
        qa: projects.filter(p => p.type === 'qa').length,
        career: projects.filter(p => p.type === 'career').length,
        other: projects.filter(p => p.type === 'other').length
      }
    }

    res.json({
      success: true,
      stats
    })
  } catch (error: any) {
    console.error('Get project stats error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

