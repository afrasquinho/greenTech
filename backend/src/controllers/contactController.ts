import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { sendEmail } from '../services/emailService'
import Contact from '../models/Contact'

export async function contactHandler(req: Request, res: Response) {
  try {
    console.log('📨 Contact request received:', {
      body: req.body,
      headers: req.headers['content-type']
    })
    
    const { name, email, company, service, message } = req.body

    // Validation
    if (!name || !email || !service || !message) {
      console.log('❌ Validation failed - missing fields')
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
      if (mongoose.connection.readyState !== 1) {
        console.error('❌ MongoDB not connected. Connection state:', mongoose.connection.readyState)
        throw new Error('MongoDB not connected')
      }
      
      savedContact = await Contact.create({
        name,
        email,
        company,
        service,
        message
      })
      console.log('✅ Contact saved to database:', {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        service: savedContact.service
      })
    } catch (dbError: any) {
      // Log detailed error
      console.error('❌ Database error:', {
        message: dbError.message,
        name: dbError.name,
        code: dbError.code,
        readyState: mongoose.connection.readyState
      })
      // Don't fail the request, but log the error
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

