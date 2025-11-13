# 🔐 Variáveis de Ambiente

## Backend `.env`

```env
# Server
PORT=3001
NODE_ENV=development

# OpenAI (opcional)
OPENAI_API_KEY=sk-proj-your-key-here

# Email SMTP (opcional - usar EMAIL_SETUP.md)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app

# MongoDB (obter connection string do MongoDB Atlas)
# Formato: mongodb+srv://user:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# OAuth - Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback

# OAuth - GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/github/callback

# Frontend URL (for OAuth redirects)
FRONTEND_URL=http://localhost:5173

# Stripe Payment Gateway (opcional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Frontend `.env` ou `.env.local`

```env
# API Backend
VITE_API_URL=http://localhost:3001/api

# Google Analytics (opcional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe Payment Gateway (opcional)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

---

## 🚀 Produção

### Backend (Railway/Render)
```env
PORT=3001
NODE_ENV=production
OPENAI_API_KEY=sk-proj-...
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxx...
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://seu-backend.railway.app/api/auth/google/callback
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=https://seu-backend.railway.app/api/auth/github/callback
FRONTEND_URL=https://seu-frontend.vercel.app
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Frontend (Netlify/Vercel)
```env
VITE_API_URL=https://seu-backend.railway.app/api
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

---

**Dica**: Nunca commite `.env` no Git! 🚫

