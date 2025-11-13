#!/usr/bin/env node

/**
 * Script para verificar se a configuração está correta
 * Uso: node check-config.js
 */

const fs = require('fs')
const path = require('path')
require('dotenv').config()

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkEnvFile() {
  const envPath = path.join(__dirname, '.env')
  if (!fs.existsSync(envPath)) {
    log('❌ Ficheiro .env não encontrado!', 'red')
    log('   Cria o ficheiro: cp .env.example .env', 'yellow')
    return false
  }
  log('✅ Ficheiro .env existe', 'green')
  return true
}

function checkRequiredVars() {
  const required = [
    'PORT',
    'MONGODB_URI',
    'JWT_SECRET',
    'FRONTEND_URL'
  ]

  const missing = []
  const weak = []

  required.forEach(varName => {
    const value = process.env[varName]
    if (!value || value.trim() === '') {
      missing.push(varName)
    } else if (varName === 'JWT_SECRET' && value.length < 32) {
      weak.push(`${varName} (muito curto, mínimo 32 caracteres)`)
    } else {
      log(`✅ ${varName} configurado`, 'green')
    }
  })

  if (missing.length > 0) {
    log('\n❌ Variáveis obrigatórias em falta:', 'red')
    missing.forEach(v => log(`   - ${v}`, 'red'))
    return false
  }

  if (weak.length > 0) {
    log('\n⚠️  Variáveis com valores fracos:', 'yellow')
    weak.forEach(v => log(`   - ${v}`, 'yellow'))
  }

  return true
}

function checkOptionalVars() {
  const optional = {
    'OPENAI_API_KEY': 'Chat IA',
    'STRIPE_SECRET_KEY': 'Pagamentos Stripe',
    'STRIPE_WEBHOOK_SECRET': 'Webhook Stripe',
    'GOOGLE_CLIENT_ID': 'OAuth Google',
    'GOOGLE_CLIENT_SECRET': 'OAuth Google',
    'GITHUB_CLIENT_ID': 'OAuth GitHub',
    'GITHUB_CLIENT_SECRET': 'OAuth GitHub',
    'SMTP_HOST': 'Email SMTP'
  }

  log('\n📋 Variáveis opcionais:', 'cyan')
  let configured = 0

  Object.entries(optional).forEach(([varName, description]) => {
    const value = process.env[varName]
    if (value && value.trim() !== '' && !value.includes('your-') && !value.includes('CONFIGURAR')) {
      log(`✅ ${varName} - ${description}`, 'green')
      configured++
    } else {
      log(`⚪ ${varName} - ${description} (não configurado)`, 'blue')
    }
  })

  return configured
}

function checkMongoUri() {
  const uri = process.env.MONGODB_URI
  if (!uri) return false

  if (uri.includes('username') || uri.includes('password') || uri.includes('cluster.mongodb.net')) {
    log('\n⚠️  MONGODB_URI parece ser um template', 'yellow')
    log('   Certifica-te de substituir username, password e cluster', 'yellow')
    return false
  }

  if (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://')) {
    log('✅ Formato MONGODB_URI válido', 'green')
    return true
  }

  log('⚠️  MONGODB_URI formato inválido', 'yellow')
  return false
}

function checkJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) return false

  if (secret.length < 32) {
    log('⚠️  JWT_SECRET muito curto (mínimo 32 caracteres)', 'yellow')
    return false
  }

  if (secret.includes('your-') || secret.includes('change-this')) {
    log('⚠️  JWT_SECRET parece ser um template', 'yellow')
    log('   Gera uma chave segura: openssl rand -base64 32', 'yellow')
    return false
  }

  log('✅ JWT_SECRET parece seguro', 'green')
  return true
}

function main() {
  log('\n🔍 Verificando configuração do backend...\n', 'cyan')

  let allGood = true

  // Verificar ficheiro .env
  if (!checkEnvFile()) {
    allGood = false
    log('\n❌ Configuração incompleta!\n', 'red')
    process.exit(1)
  }

  // Verificar variáveis obrigatórias
  log('\n📋 Variáveis obrigatórias:', 'cyan')
  if (!checkRequiredVars()) {
    allGood = false
  }

  // Verificar MONGODB_URI
  log('\n🗄️  Verificando MongoDB:', 'cyan')
  if (!checkMongoUri()) {
    allGood = false
  }

  // Verificar JWT_SECRET
  log('\n🔐 Verificando JWT:', 'cyan')
  if (!checkJwtSecret()) {
    allGood = false
  }

  // Verificar variáveis opcionais
  const optionalCount = checkOptionalVars()

  // Resumo
  log('\n' + '='.repeat(50), 'cyan')
  if (allGood) {
    log('✅ Configuração básica OK!', 'green')
    if (optionalCount > 0) {
      log(`✅ ${optionalCount} funcionalidades opcionais configuradas`, 'green')
    } else {
      log('💡 Dica: Configura funcionalidades opcionais para melhor experiência', 'yellow')
    }
    log('\n🚀 Podes iniciar o servidor: npm run dev\n', 'green')
  } else {
    log('❌ Configuração incompleta!', 'red')
    log('   Verifica os avisos acima e corrige os problemas.\n', 'yellow')
    process.exit(1)
  }
}

main()

