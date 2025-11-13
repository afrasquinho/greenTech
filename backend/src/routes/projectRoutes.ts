import express from 'express'
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats
} from '../controllers/projectController'
import { authenticate } from '../middleware/auth'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// Get project statistics
router.get('/stats', getProjectStats)

// Get all projects for the authenticated user
router.get('/', getProjects)

// Get a specific project
router.get('/:id', getProject)

// Create a new project
router.post('/', createProject)

// Update a project
router.put('/:id', updateProject)

// Delete a project
router.delete('/:id', deleteProject)

export default router

