import { Request, Response } from 'express'
import { sendEmail } from '../services/emailService'
import Contact from '../models/Contact'

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

    // Save to MongoDB (if connected)
    let savedContact = null
    try {
      savedContact = await Contact.create({
        name,
        email,
        company,
        service,
        message
      })
      console.log('✅ Contact saved to database:', savedContact._id)
    } catch (dbError: any) {
      // Database not connected or error - continue anyway
      console.log('⚠️  Could not save to database:', dbError.message)
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
      message: 'Mensagem enviada com sucesso!',
      id: savedContact?._id
    })
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

