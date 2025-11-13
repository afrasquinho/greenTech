# 🔐 Variáveis de Ambiente para Produção

Este documento lista todas as variáveis de ambiente necessárias para produção, organizadas por prioridade e funcionalidade.

---

## 📋 **VARIÁVEIS OBRIGATÓRIAS**

Estas variáveis **DEVEM** estar configuradas para a aplicação funcionar.

### **Backend**

```env
# Server
PORT=3001
NODE_ENV=production

# Database (OBRIGATÓRIO)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority

# JWT Authentication (OBRIGATÓRIO)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# Frontend URL (OBRIGATÓRIO)
FRONTEND_URL=https://seu-frontend.vercel.app
```

### **Frontend**

```env
# API Backend (OBRIGATÓRIO)
VITE_API_URL=https://seu-backend.railway.app/api
```

---

## ⚙️ **VARIÁVEIS OPCIONAIS (mas recomendadas)**

### **Backend - OpenAI (Chat IA)**

```env
# Para o chat bot funcionar com IA real
OPENAI_API_KEY=sk-proj-your-production-key-here
```

**Como obter:**
1. Vai a [OpenAI Platform](https://platform.openai.com)
2. Cria conta ou faz login
3. Vai a API Keys
4. Cria nova key (ou usa existente)
5. **Importante**: Em produção, usa uma key separada da de desenvolvimento

---

### **Backend - Stripe (Pagamentos)**

```env
# Stripe Secret Key (produção)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key

# Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

**Como obter:**
1. Vai a [Stripe Dashboard](https://dashboard.stripe.com)
2. Vai a Developers → API keys
3. **Importante**: Em produção, usa "Live mode" keys (não test keys)
4. Para webhook:
   - Vai a Developers → Webhooks
   - Cria endpoint: `https://seu-backend.railway.app/api/payments/webhook`
   - Copia o "Signing secret"

**⚠️ ATENÇÃO**: 
- Test keys começam com `sk_test_`
- Live keys começam com `sk_live_`
- Em produção, usa **sempre** live keys!

---

### **Frontend - Stripe (Pagamentos)**

```env
# Stripe Publishable Key (produção)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

**Como obter:**
1. Mesmo lugar que a secret key
2. É a "Publishable key" (pública, pode estar no código)
3. **Importante**: Em produção, usa live key (`pk_live_`)

---

### **Backend - OAuth Google**

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://seu-backend.railway.app/api/auth/google/callback
```

**Como configurar:**
1. Vai a [Google Cloud Console](https://console.cloud.google.com)
2. Cria projeto ou seleciona existente
3. Vai a APIs & Services → Credentials
4. Cria OAuth 2.0 Client ID
5. **Authorized redirect URIs**: Adiciona `https://seu-backend.railway.app/api/auth/google/callback`
6. Copia Client ID e Client Secret

**⚠️ IMPORTANTE**: 
- Em produção, usa URLs de produção (não localhost)
- Adiciona o domínio do frontend em "Authorized JavaScript origins"

---

### **Backend - OAuth GitHub**

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=https://seu-backend.railway.app/api/auth/github/callback
```

**Como configurar:**
1. Vai a [GitHub Settings → Developer settings](https://github.com/settings/developers)
2. OAuth Apps → New OAuth App
3. **Authorization callback URL**: `https://seu-backend.railway.app/api/auth/github/callback`
4. Copia Client ID e Client Secret

---

### **Backend - Email SMTP**

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your-sendgrid-api-key
```

**Opções:**

#### **SendGrid (Recomendado)**
1. Vai a [SendGrid](https://sendgrid.com)
2. Cria conta (grátis até 100 emails/dia)
3. Vai a Settings → API Keys
4. Cria API Key
5. Configura:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=SG.sua-api-key-aqui
   ```

#### **Gmail (Alternativa)**
1. Vai a [Google Account](https://myaccount.google.com)
2. Security → 2-Step Verification (ativar)
3. App Passwords → Generate
4. Configura:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=seu-email@gmail.com
   SMTP_PASS=app-password-gerado
   ```

---

### **Frontend - Google Analytics**

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Como obter:**
1. Vai a [Google Analytics](https://analytics.google.com)
2. Cria propriedade
3. Vai a Admin → Data Streams
4. Copia Measurement ID (formato: `G-XXXXXXXXXX`)

---

## 🔄 **DIFERENÇAS ENTRE DEV E PRODUÇÃO**

### **URLs**

| Variável | Desenvolvimento | Produção |
|----------|----------------|----------|
| `FRONTEND_URL` | `http://localhost:5173` | `https://seu-frontend.vercel.app` |
| `VITE_API_URL` | `http://localhost:3001/api` | `https://seu-backend.railway.app/api` |
| `GOOGLE_CALLBACK_URL` | `http://localhost:3001/api/auth/google/callback` | `https://seu-backend.railway.app/api/auth/google/callback` |
| `GITHUB_CALLBACK_URL` | `http://localhost:3001/api/auth/github/callback` | `https://seu-backend.railway.app/api/auth/github/callback` |

### **Keys**

| Serviço | Dev | Produção |
|---------|-----|----------|
| Stripe | `sk_test_...` | `sk_live_...` |
| Stripe (Publishable) | `pk_test_...` | `pk_live_...` |
| OpenAI | Pode usar mesma key | Recomendado key separada |

### **NODE_ENV**

```env
# Dev
NODE_ENV=development

# Produção
NODE_ENV=production
```

---

## ✅ **CHECKLIST DE CONFIGURAÇÃO**

### **Backend (Railway/Render)**

- [ ] `PORT=3001`
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI` (connection string de produção)
- [ ] `JWT_SECRET` (chave forte, mínimo 32 caracteres)
- [ ] `JWT_EXPIRES_IN=7d`
- [ ] `FRONTEND_URL` (URL do frontend em produção)
- [ ] `OPENAI_API_KEY` (se usar chat IA)
- [ ] `STRIPE_SECRET_KEY` (se usar pagamentos - **live key**)
- [ ] `STRIPE_WEBHOOK_SECRET` (se usar pagamentos)
- [ ] `GOOGLE_CLIENT_ID` (se usar OAuth)
- [ ] `GOOGLE_CLIENT_SECRET` (se usar OAuth)
- [ ] `GOOGLE_CALLBACK_URL` (URL de produção)
- [ ] `GITHUB_CLIENT_ID` (se usar OAuth)
- [ ] `GITHUB_CLIENT_SECRET` (se usar OAuth)
- [ ] `GITHUB_CALLBACK_URL` (URL de produção)
- [ ] `SMTP_HOST` (se usar email)
- [ ] `SMTP_PORT` (se usar email)
- [ ] `SMTP_USER` (se usar email)
- [ ] `SMTP_PASS` (se usar email)

### **Frontend (Vercel/Netlify)**

- [ ] `VITE_API_URL` (URL do backend em produção)
- [ ] `VITE_GA_MEASUREMENT_ID` (se usar Analytics)
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` (se usar pagamentos - **live key**)

---

## 🔒 **SEGURANÇA EM PRODUÇÃO**

### **Boas Práticas**

1. **Nunca commites secrets no Git**
   - ✅ Usa variáveis de ambiente
   - ✅ Usa `.gitignore` para `.env`

2. **JWT_SECRET forte**
   - ✅ Mínimo 32 caracteres
   - ✅ Aleatório e único
   - ✅ Gera com: `openssl rand -base64 32`

3. **MongoDB seguro**
   - ✅ IP whitelist configurado
   - ✅ Utilizador com permissões mínimas
   - ✅ Connection string não commitada

4. **Stripe em produção**
   - ✅ **Sempre** usa live keys
   - ✅ Testa primeiro em modo test
   - ✅ Webhook configurado corretamente

5. **HTTPS obrigatório**
   - ✅ Todas as URLs em HTTPS
   - ✅ CORS configurado apenas para teu domínio

---

## 📝 **TEMPLATE COMPLETO**

### **Backend `.env` (Produção)**

```env
# ============================================
# SERVER
# ============================================
PORT=3001
NODE_ENV=production

# ============================================
# DATABASE
# ============================================
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority

# ============================================
# JWT
# ============================================
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# ============================================
# FRONTEND
# ============================================
FRONTEND_URL=https://seu-frontend.vercel.app

# ============================================
# OPENAI (Opcional)
# ============================================
OPENAI_API_KEY=sk-proj-your-production-key

# ============================================
# STRIPE (Opcional)
# ============================================
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# ============================================
# OAUTH GOOGLE (Opcional)
# ============================================
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://seu-backend.railway.app/api/auth/google/callback

# ============================================
# OAUTH GITHUB (Opcional)
# ============================================
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=https://seu-backend.railway.app/api/auth/github/callback

# ============================================
# EMAIL SMTP (Opcional)
# ============================================
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your-sendgrid-api-key
```

### **Frontend `.env` (Produção)**

```env
# ============================================
# API BACKEND
# ============================================
VITE_API_URL=https://seu-backend.railway.app/api

# ============================================
# GOOGLE ANALYTICS (Opcional)
# ============================================
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# ============================================
# STRIPE (Opcional)
# ============================================
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

---

## 🚀 **PRÓXIMOS PASSOS**

1. **Copia os templates acima**
2. **Substitui os valores** pelos teus valores reais
3. **Configura nas plataformas** (Railway/Vercel)
4. **Testa** cada funcionalidade
5. **Verifica** se tudo funciona

---

## 📚 **Recursos**

- [Railway Environment Variables](https://docs.railway.app/develop/variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Stripe API Keys](https://stripe.com/docs/keys)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

---

**Boa configuração! 🔐**

