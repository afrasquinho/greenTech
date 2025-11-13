#!/usr/bin/env node

/**
 * Script para verificar variáveis de ambiente de produção
 * Uso: node check-production-env.js
 * 
 * Este script verifica se todas as variáveis necessárias estão configuradas
 * e se os valores são apropriados para produção.
 */

const fs = require('fs')
const path = require('path')

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  cyan: '\x1b[34m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkBackendEnv() {
  log('\n🔍 Verificando Backend...', 'cyan')
  
  const envPath = path.join(__dirname, 'backend', '.env')
  if (!fs.existsSync(envPath)) {
    log('❌ backend/.env não encontrado', 'red')
    return false
  }

  // Try to load dotenv from backend node_modules, or parse manually
  try {
    const dotenvPath = path.join(__dirname, 'backend', 'node_modules', 'dotenv')
    require(dotenvPath).config({ path: envPath })
  } catch (e) {
    // Fallback: parse .env manually
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
        }
      }
    })
  }
  
  const required = [
    { key: 'PORT', validator: (v) => v && !isNaN(v) },
    { key: 'NODE_ENV', validator: (v) => v === 'production' },
    { key: 'MONGODB_URI', validator: (v) => v && !v.includes('localhost') && !v.includes('username') },
    { key: 'JWT_SECRET', validator: (v) => v && v.length >= 32 && !v.includes('your-') && !v.includes('change-') },
    { key: 'FRONTEND_URL', validator: (v) => v && v.startsWith('https://') && !v.includes('localhost') }
  ]

  const optional = [
    { key: 'OPENAI_API_KEY', name: 'OpenAI (Chat IA)' },
    { key: 'STRIPE_SECRET_KEY', name: 'Stripe (Pagamentos)' },
    { key: 'STRIPE_WEBHOOK_SECRET', name: 'Stripe Webhook' },
    { key: 'GOOGLE_CLIENT_ID', name: 'OAuth Google' },
    { key: 'GOOGLE_CLIENT_SECRET', name: 'OAuth Google' },
    { key: 'GITHUB_CLIENT_ID', name: 'OAuth GitHub' },
    { key: 'GITHUB_CLIENT_SECRET', name: 'OAuth GitHub' },
    { key: 'SMTP_HOST', name: 'Email SMTP' }
  ]

  let allGood = true
  let configuredOptional = 0

  // Verificar obrigatórias
  log('\n📋 Variáveis obrigatórias:', 'blue')
  required.forEach(({ key, validator }) => {
    const value = process.env[key]
    if (!value) {
      log(`❌ ${key} - NÃO CONFIGURADO`, 'red')
      allGood = false
    } else if (!validator(value)) {
      log(`⚠️  ${key} - Valor inválido ou de desenvolvimento`, 'yellow')
      if (key === 'NODE_ENV' && value !== 'production') {
        log('   Deve ser "production"', 'yellow')
      } else if (key === 'MONGODB_URI' && (value.includes('localhost') || value.includes('username'))) {
        log('   Deve ser connection string de produção (MongoDB Atlas)', 'yellow')
      } else if (key === 'JWT_SECRET' && value.length < 32) {
        log('   Deve ter mínimo 32 caracteres', 'yellow')
      } else if (key === 'FRONTEND_URL' && !value.startsWith('https://')) {
        log('   Deve ser URL HTTPS de produção', 'yellow')
      }
      allGood = false
    } else {
      log(`✅ ${key}`, 'green')
    }
  })

  // Verificar opcionais
  log('\n📋 Variáveis opcionais:', 'blue')
  optional.forEach(({ key, name }) => {
    const value = process.env[key]
    if (value && value.trim() !== '' && !value.includes('your-') && !value.includes('CONFIGURAR')) {
      log(`✅ ${key} - ${name}`, 'green')
      configuredOptional++
    } else {
      log(`⚪ ${key} - ${name} (não configurado)`, 'blue')
    }
  })

  // Verificações especiais
  log('\n🔐 Verificações de segurança:', 'cyan')
  
  // Stripe keys
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (stripeKey) {
    if (stripeKey.startsWith('sk_test_')) {
      log('⚠️  STRIPE_SECRET_KEY é uma test key!', 'yellow')
      log('   Em produção, usa sk_live_...', 'yellow')
      allGood = false
    } else if (stripeKey.startsWith('sk_live_')) {
      log('✅ Stripe usando live key (produção)', 'green')
    }
  }

  // OAuth callbacks
  const googleCallback = process.env.GOOGLE_CALLBACK_URL
  const githubCallback = process.env.GITHUB_CALLBACK_URL
  
  if (googleCallback && googleCallback.includes('localhost')) {
    log('⚠️  GOOGLE_CALLBACK_URL aponta para localhost', 'yellow')
    allGood = false
  }
  
  if (githubCallback && githubCallback.includes('localhost')) {
    log('⚠️  GITHUB_CALLBACK_URL aponta para localhost', 'yellow')
    allGood = false
  }

  // MongoDB URI
  const mongoUri = process.env.MONGODB_URI
  if (mongoUri && (mongoUri.includes('localhost') || mongoUri.includes('username'))) {
    log('⚠️  MONGODB_URI parece ser de desenvolvimento', 'yellow')
    log('   Em produção, usa MongoDB Atlas', 'yellow')
    allGood = false
  }

  return { allGood, configuredOptional }
}

function checkFrontendEnv() {
  log('\n🔍 Verificando Frontend...', 'cyan')
  
  const envPath = path.join(__dirname, 'frontend', '.env.local')
  if (!fs.existsSync(envPath)) {
    log('⚠️  frontend/.env.local não encontrado', 'yellow')
    log('   Em produção, configura no Vercel/Netlify', 'yellow')
    return false
  }

  // Try to load dotenv, or parse manually
  try {
    const dotenvPath = path.join(__dirname, 'backend', 'node_modules', 'dotenv')
    require(dotenvPath).config({ path: envPath })
  } catch (e) {
    // Fallback: parse .env manually
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
        }
      }
    })
  }
  
  const required = [
    { key: 'VITE_API_URL', validator: (v) => v && v.startsWith('https://') && !v.includes('localhost') }
  ]

  const optional = [
    { key: 'VITE_GA_MEASUREMENT_ID', name: 'Google Analytics' },
    { key: 'VITE_STRIPE_PUBLISHABLE_KEY', name: 'Stripe (Pagamentos)' }
  ]

  let allGood = true
  let configuredOptional = 0

  // Verificar obrigatórias
  log('\n📋 Variáveis obrigatórias:', 'blue')
  required.forEach(({ key, validator }) => {
    const value = process.env[key]
    if (!value) {
      log(`❌ ${key} - NÃO CONFIGURADO`, 'red')
      allGood = false
    } else if (!validator(value)) {
      log(`⚠️  ${key} - Valor inválido`, 'yellow')
      if (key === 'VITE_API_URL' && !value.startsWith('https://')) {
        log('   Deve ser URL HTTPS de produção', 'yellow')
      }
      allGood = false
    } else {
      log(`✅ ${key}`, 'green')
    }
  })

  // Verificar opcionais
  log('\n📋 Variáveis opcionais:', 'blue')
  optional.forEach(({ key, name }) => {
    const value = process.env[key]
    if (value && value.trim() !== '' && !value.includes('your-') && !value.includes('G-XXXXXXXXXX')) {
      log(`✅ ${key} - ${name}`, 'green')
      configuredOptional++
      
      // Verificar Stripe key
      if (key === 'VITE_STRIPE_PUBLISHABLE_KEY') {
        if (value.startsWith('pk_test_')) {
          log('   ⚠️  É uma test key! Em produção usa pk_live_...', 'yellow')
        } else if (value.startsWith('pk_live_')) {
          log('   ✅ Usando live key (produção)', 'green')
        }
      }
    } else {
      log(`⚪ ${key} - ${name} (não configurado)`, 'blue')
    }
  })

  return { allGood, configuredOptional }
}

function main() {
  log('\n' + '='.repeat(60), 'cyan')
  log('🔐 Verificação de Variáveis de Ambiente - PRODUÇÃO', 'cyan')
  log('='.repeat(60) + '\n', 'cyan')

  const backendResult = checkBackendEnv()
  const frontendResult = checkFrontendEnv()

  // Resumo
  log('\n' + '='.repeat(60), 'cyan')
  log('📊 RESUMO', 'cyan')
  log('='.repeat(60), 'cyan')

  if (backendResult && backendResult.allGood) {
    log('\n✅ Backend: Configuração OK', 'green')
    log(`   ${backendResult.configuredOptional} funcionalidades opcionais configuradas`, 'green')
  } else {
    log('\n❌ Backend: Configuração incompleta', 'red')
    log('   Verifica os avisos acima', 'yellow')
  }

  if (frontendResult && frontendResult.allGood) {
    log('\n✅ Frontend: Configuração OK', 'green')
    log(`   ${frontendResult.configuredOptional} funcionalidades opcionais configuradas`, 'green')
  } else {
    log('\n⚠️  Frontend: Verifica configuração', 'yellow')
    log('   Em produção, configura no Vercel/Netlify dashboard', 'yellow')
  }

  if (backendResult && backendResult.allGood && frontendResult && frontendResult.allGood) {
    log('\n🎉 Tudo pronto para produção!', 'green')
    log('\nPróximos passos:', 'cyan')
    log('1. Configura estas variáveis no Railway (backend)', 'blue')
    log('2. Configura estas variáveis no Vercel/Netlify (frontend)', 'blue')
    log('3. Faz deploy', 'blue')
    log('4. Testa todas as funcionalidades\n', 'blue')
  } else {
    log('\n⚠️  Corrige os problemas acima antes de fazer deploy', 'yellow')
    log('   Consulta PRODUCTION_ENV.md para mais detalhes\n', 'yellow')
    process.exit(1)
  }
}

main()

