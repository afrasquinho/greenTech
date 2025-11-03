# 🚀 Guia de Deploy - GreenTech Solutions

## 📋 Opções de Deploy

### 1. **Deploy Simples (Netlify Frontend + Railway Backend)**

#### Frontend → Netlify (Grátis)
```bash
cd frontend
npm run build
# Arrastar pasta dist/ para Netlify ou:
npx netlify deploy --dir=dist --prod
```

**Variáveis no Netlify:**
```env
VITE_API_URL=https://seu-backend.railway.app/api
```

#### Backend → Railway (Grátis com créditos)
```bash
cd backend
# Conectar GitHub repo
# Railway detecta automaticamente Node.js
```

**Variáveis no Railway:**
```env
PORT=3001
OPENAI_API_KEY=sk-...
```

---

### 2. **Deploy Completo (Vercel Frontend + Render Backend)**

#### Frontend → Vercel
```bash
cd frontend
vercel --prod
```

**Config em vercel.json:**
```json
{
  "build": {
    "env": {
      "VITE_API_URL": "https://seu-backend.onrender.com/api"
    }
  }
}
```

#### Backend → Render
- Criar Web Service
- Build: `npm install && npm run build`
- Start: `npm start`
- Env vars: `OPENAI_API_KEY`

---

### 3. **Deploy Tradicional (cPanel/FTP)**

#### Frontend
```bash
cd frontend
npm run build
# Upload dist/* para public_html/
```

#### Backend
```bash
cd backend
npm run build
# Upload dist/* para cPanel
# Configurar Node.js app
# Port: 3001
```

---

## 🔑 Variáveis de Ambiente

### Frontend (.env ou .env.production)
```env
VITE_API_URL=https://api.greentechsolutions.pt/api
```

### Backend (.env)
```env
PORT=3001
OPENAI_API_KEY=sk-proj-...
NODE_ENV=production
```

---

## ✅ Checklist Pré-Deploy

- [ ] Testar localmente
- [ ] Build production testado
- [ ] Variáveis configuradas
- [ ] CORS configurado para domínio
- [ ] OpenAI API key válida
- [ ] SSL/HTTPS ativo
- [ ] Backup local criado

---

## 🔒 Segurança Production

1. **HTTPS obrigatório**
2. **Rate limiting** no backend
3. **CORS restrito** aos seus domínios
4. **Secrets em env vars** nunca no código
5. **Monitoring** (Sentry, etc.)

---

## 📊 Monitoramento

Recomendações:
- **Uptime**: UptimeRobot (grátis)
- **Errors**: Sentry
- **Analytics**: Google Analytics
- **Logs**: Papertrail ou Logflare

---

## 🆘 Troubleshooting

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Backend não inicia?**
- Verificar PORT disponível
- Verificar env vars
- Verificar logs

**Frontend não conecta?**
- Verificar VITE_API_URL
- Verificar CORS
- Verificar HTTPS

---

**Deploy bem-sucedido! 🎉**

