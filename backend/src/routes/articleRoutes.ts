import express from 'express'
import {
  getPublishedArticles,
  getArticleBySlug,
  getFeaturedArticles,
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/articleController'
import { authenticate } from '../middleware/auth'
import { requireRole } from '../middleware/auth'

const router = express.Router()

// Public routes
router.get('/published', getPublishedArticles)
router.get('/featured', getFeaturedArticles)
router.get('/slug/:slug', getArticleBySlug)

// Admin routes (require authentication and admin role)
router.use(authenticate)
router.use(requireRole(['admin']))

router.get('/', getAllArticles)
router.get('/:id', getArticleById)
router.post('/', createArticle)
router.put('/:id', updateArticle)
router.delete('/:id', deleteArticle)

export default router

