import express from 'express'
import { contactHandler } from '../controllers/contactController'

const router = express.Router()

router.post('/contact', contactHandler)

export default router

