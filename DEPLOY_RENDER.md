# 🚀 Deploy no Render (Gratuito)

Guia completo para fazer deploy do backend no Render (alternativa gratuita ao Railway).

---

## 📋 **PRÉ-REQUISITOS**

- [x] Código no GitHub
- [x] Conta GitHub
- [x] MongoDB Atlas configurado

---

## 🎯 **PASSO 1: Criar Conta Render**

1. Vai a [render.com](https://render.com)
2. Clica "Get Started for Free"
3. Login com GitHub
4. Autoriza Render a aceder aos repositórios

---

## 🎯 **PASSO 2: Criar Web Service**

1. No Dashboard, clica **"New +"**
2. Seleciona **"Web Service"**
3. Conecta o repositório:
   - Seleciona `greenTech` (ou o nome do teu repo)
   - Autoriza se necessário

---

## ⚙️ **PASSO 3: Configurar Serviço**

### **Configurações Básicas:**

- **Name**: `greentech-backend` (ou o nome que quiseres)
- **Environment**: `Node`
- **Region**: Escolhe o mais próximo (ex: `Frankfurt`, `Oregon`)
- **Branch**: `main`

### **Configurações de Build:**

- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### **Plano:**

- **Escolhe "Free"** (não Starter!)
- Free inclui:
  - 750 horas/mês
  - 512 MB RAM
  - 0.1 CPU
  - HTTPS automático

---

## 🔐 **PASSO 4: Variáveis de Ambiente**

1. Antes de criar, vai a **"Advanced"** → **"Environment Variables"**
2. Adiciona estas variáveis:

```env
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**⚠️ IMPORTANTE**: 
- Substitui `MONGODB_URI` pela tua connection string real
- Substitui `JWT_SECRET` por uma chave segura (mínimo 32 caracteres)
- `FRONTEND_URL` é temporário, vamos atualizar depois

---

## 🚀 **PASSO 5: Criar e Deploy**

1. Clica **"Create Web Service"**
2. Render vai começar o deploy automaticamente
3. Aguarda 5-10 minutos (primeiro deploy é mais lento)
4. Podes ver o progresso nos logs

---

## 📍 **PASSO 6: Obter URL**

1. Quando o deploy terminar, vais ver o URL
2. Formato: `greentech-backend.onrender.com`
3. **COPIA ESTE URL** - vais precisar!

---

## ✅ **PASSO 7: Testar**

```bash
curl https://greentech-backend.onrender.com/health
```

Deve retornar:
```json
{"status":"healthy","database":"connected"}
```

---

## 🔄 **PASSO 8: Atualizar URLs**

Depois de ter o URL do frontend (Vercel):

### **No Render:**

1. Vai ao teu serviço
2. **Environment** → Edita variáveis
3. Atualiza:
   ```env
   FRONTEND_URL=https://seu-frontend.vercel.app
   GOOGLE_CALLBACK_URL=https://seu-backend.onrender.com/api/auth/google/callback
   GITHUB_CALLBACK_URL=https://seu-backend.onrender.com/api/auth/github/callback
   ```

### **No Vercel:**

1. Settings → Environment Variables
2. Atualiza:
   ```env
   VITE_API_URL=https://seu-backend.onrender.com/api
   ```
3. Re-deploy

---

## ⚠️ **SPIN DOWN (SLEEP)**

Render pode "dormir" após 15 minutos de inatividade:
- Primeira requisição pode demorar ~30 segundos (wake up)
- Depois funciona normalmente

### **Solução: Manter Acordado (Opcional)**

1. Cria conta grátis em [UptimeRobot](https://uptimerobot.com)
2. Adiciona monitor:
   - URL: `https://seu-backend.onrender.com/health`
   - Interval: 5 minutos
3. UptimeRobot vai fazer ping e manter acordado

---

## 🐛 **PROBLEMAS COMUNS**

### **Build Falha**
- Verifica logs no Render
- Verifica se `npm run build` funciona localmente
- Verifica se todas as dependências estão no `package.json`

### **Start Falha**
- Verifica se `dist/index.js` existe após build
- Verifica logs para erros
- Verifica variáveis de ambiente

### **MongoDB não conecta**
- Verifica `MONGODB_URI`
- Verifica IP whitelist no MongoDB Atlas
- Adiciona IP do Render (ou 0.0.0.0/0 para desenvolvimento)

---

## 📝 **CHECKLIST**

- [ ] Conta Render criada
- [ ] Web Service criado
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Plano: **Free**
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy concluído
- [ ] URL copiado
- [ ] Health check funciona
- [ ] URLs atualizados (frontend e callbacks)

---

## 🎉 **PRONTO!**

Backend deployado no Render (gratuito)! 🚀

**Próximos passos:**
- Deploy frontend no Vercel
- Atualizar URLs
- Configurar OAuth (se usar)
- Testar tudo

---

**Bom deploy! 🚀**

