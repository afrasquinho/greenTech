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
```

## Frontend `.env` ou `.env.local`

```env
# API Backend
VITE_API_URL=http://localhost:3001/api

# Google Analytics (opcional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
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
```

### Frontend (Netlify/Vercel)
```env
VITE_API_URL=https://seu-backend.railway.app/api
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

**Dica**: Nunca commite `.env` no Git! 🚫

