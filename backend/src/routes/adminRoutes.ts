import express from 'express'
import {
  getDashboardStats,
  getAllClients,
  getAllProjects,
  updateProjectStatus,
  getAllContacts,
  markContactAsRead,
  deleteContact
} from '../controllers/adminController'
import { authenticate } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// All routes require authentication and admin role
router.use(authenticate)
router.use(requireRole(['admin']))

// Dashboard stats
router.get('/dashboard/stats', getDashboardStats)

// Clients
router.get('/clients', getAllClients)

// Projects
router.get('/projects', getAllProjects)
router.put('/projects/:id/status', updateProjectStatus)

// Contacts
router.get('/contacts', getAllContacts)
router.put('/contacts/:id/read', markContactAsRead)
router.delete('/contacts/:id', deleteContact)

export default router

