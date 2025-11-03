import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export async function sendEmail(options: EmailOptions) {
  // If no SMTP configured, just log
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('📧 Email would be sent (SMTP not configured):', {
      to: options.to,
      subject: options.subject
    })
    console.log('Email body:', options.html)
    return { messageId: 'mock-message-id' }
  }

  try {
    const info = await transporter.sendMail({
      from: `"GreenTech Solutions" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html
    })

    console.log('✅ Email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('❌ Email error:', error)
    throw error
  }
}

