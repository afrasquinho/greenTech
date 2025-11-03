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

# Database (futuro)
# DATABASE_URL=postgresql://user:pass@localhost:5432/greentech
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
```

### Frontend (Netlify/Vercel)
```env
VITE_API_URL=https://seu-backend.railway.app/api
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

**Dica**: Nunca commite `.env` no Git! 🚫

