# 🚀 Quick Start Guide - GreenTech Solutions

## ⚡ Início Rápido (2 minutos)

### 1️⃣ Backend
```bash
cd backend
npm install
npm run dev
```

### 2️⃣ Frontend (novo terminal)
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Aceder
- 🌐 **Frontend**: http://localhost:5173
- 📡 **Backend API**: http://localhost:3001

---

## 🤖 Integração OpenAI (Opcional)

1. Registe-se: https://platform.openai.com
2. Crie API Key
3. Edite `backend/.env`:
   ```env
   OPENAI_API_KEY=sk-...
   ```

**Sem API Key?** Sistema usa respostas inteligentes mock! ✅

---

## 🎨 Ver em Ação

1. Abra http://localhost:5173
2. Clique no **chat IA** à direita
3. Faça uma pergunta sobre QA, serviços, etc.
4. Veja a IA responder!

---

## 📦 Deploy

### Frontend → Vercel/Netlify
```bash
cd frontend && npm run build
# Upload dist/
```

### Backend → Railway/Render
```bash
cd backend && npm run build
# Upload dist/
```

---

## ✅ Checklist

- [ ] Backend a correr (porta 3001)
- [ ] Frontend a correr (porta 5173)
- [ ] Chat IA funcionando
- [ ] OpenAI configurado (opcional)

---

## 🐛 Problemas?

**Backend não inicia?**
```bash
cd backend && rm -rf node_modules && npm install
```

**Frontend não inicia?**
```bash
cd frontend && rm -rf node_modules && npm install
```

**Chat não funciona?**
- Veja console do browser
- Verifique se backend está a correr
- Teste: http://localhost:3001/health

---

**Pronto! Seu site está no ar! 🎉**

