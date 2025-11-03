import { Request, Response } from 'express'
import { getAIResponse } from '../services/aiService'

export async function chatHandler(req: Request, res: Response) {
  try {
    const { message } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' })
    }

    const response = await getAIResponse(message)

    res.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

