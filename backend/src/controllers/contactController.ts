import { Request, Response } from 'express'
import { sendEmail } from '../services/emailService'

export async function contactHandler(req: Request, res: Response) {
  try {
    const { name, email, company, service, message } = req.body

    // Validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, service, message' 
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Send email
    await sendEmail({
      to: 'info@greentechsolutions.pt', // Change this to your email
      subject: `Novo Contacto - ${service}`,
      html: `
        <h2>Novo Contacto Recebido</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company || 'Não especificado'}</p>
        <p><strong>Serviço:</strong> ${service}</p>
        <h3>Mensagem:</h3>
        <p>${message}</p>
      `
    })

    res.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso!' 
    })
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

