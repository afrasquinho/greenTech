const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'client'], default: 'client' }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Conectado ao MongoDB')

    const email = process.argv[2] || 'admin@greentech.pt'
    const password = process.argv[3] || 'admin123'
    const name = process.argv[4] || 'Administrador'

    // Verificar se já existe
    const existing = await User.findOne({ email })
    if (existing) {
      console.log('⚠️  Utilizador já existe!')
      if (existing.role === 'admin') {
        console.log('✅ Já é admin!')
      } else {
        existing.role = 'admin'
        await existing.save()
        console.log('✅ Role atualizado para admin!')
      }
      await mongoose.disconnect()
      process.exit(0)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar admin
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    })

    console.log('✅ Admin criado com sucesso!')
    console.log('Email:', admin.email)
    console.log('Password:', password)
    console.log('Role:', admin.role)

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Erro:', error.message)
    await mongoose.disconnect()
    process.exit(1)
  }
}

createAdmin()
