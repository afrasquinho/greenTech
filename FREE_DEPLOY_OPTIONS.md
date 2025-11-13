# 🆓 Opções Gratuitas de Deploy

Alternativas gratuitas ao Railway para deploy do backend.

---

## 🎯 **OPÇÕES GRATUITAS PARA BACKEND**

### **1. Render** ⭐ RECOMENDADO (Grátis)
- ✅ **Plano gratuito disponível**
- ✅ 750 horas/mês grátis
- ✅ HTTPS automático
- ✅ Deploy automático via GitHub
- ⚠️ Pode "spin down" após 15 min de inatividade (mas acorda rápido)

**Link**: [render.com](https://render.com)

---

### **2. Fly.io** (Grátis)
- ✅ **Plano gratuito generoso**
- ✅ 3 VMs grátis
- ✅ Sem "spin down"
- ✅ Global edge network
- ⚠️ Setup um pouco mais complexo

**Link**: [fly.io](https://fly.io)

---

### **3. Cyclic** (Grátis)
- ✅ **100% grátis**
- ✅ Sem limites de tempo
- ✅ Deploy automático via GitHub
- ✅ MongoDB incluído (opcional)
- ⚠️ Pode ter limitações de recursos

**Link**: [cyclic.sh](https://cyclic.sh)

---

### **4. Vercel** (Grátis - Backend também!)
- ✅ **Plano gratuito**
- ✅ Serverless functions
- ✅ Deploy automático
- ⚠️ Melhor para frontend, mas suporta backend também

**Link**: [vercel.com](https://vercel.com)

---

### **5. Heroku** (Alternativa)
- ⚠️ Não tem mais plano gratuito (removido em 2022)
- 💰 Pago apenas

---

## 🚀 **RECOMENDAÇÃO: Render**

Render é a melhor alternativa gratuita ao Railway.

### **Porquê Render?**
- ✅ Plano gratuito real (não trial)
- ✅ Fácil de configurar
- ✅ Similar ao Railway
- ✅ Deploy automático via GitHub
- ✅ HTTPS automático

---

## 📋 **DEPLOY NO RENDER - PASSO A PASSO**

### **1. Criar Conta**

1. Vai a [render.com](https://render.com)
2. Clica "Get Started for Free"
3. Login com GitHub
4. Autoriza Render a aceder aos repositórios

### **2. Criar Web Service**

1. Dashboard → "New +" → "Web Service"
2. Conecta o repositório GitHub (`greenTech`)
3. Configura:
   - **Name**: `greentech-backend` (ou o nome que quiseres)
   - **Environment**: `Node`
   - **Region**: Escolhe o mais próximo (ex: `Frankfurt`)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### **3. Plano**

- Escolhe **"Free"** (não Starter!)
- Free tem:
  - 750 horas/mês
  - 512 MB RAM
  - 0.1 CPU
  - Pode "spin down" após inatividade (mas acorda rápido)

### **4. Variáveis de Ambiente**

1. Vai a **Environment**
2. Adiciona:
   ```env
   PORT=3001
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=...
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   ```

### **5. Deploy**

1. Clica "Create Web Service"
2. Render vai fazer deploy automaticamente
3. Aguarda 5-10 minutos (primeiro deploy é mais lento)

### **6. Obter URL**

1. Quando o deploy terminar, vais ver o URL
2. Formato: `greentech-backend.onrender.com`
3. **COPIA ESTE URL**

---

## 🔄 **ATUALIZAR VARIÁVEIS**

Depois de ter o URL do backend e frontend:

### **No Render (Backend):**

1. Vai a **Environment**
2. Atualiza:
   ```env
   FRONTEND_URL=https://seu-frontend.vercel.app
   GOOGLE_CALLBACK_URL=https://seu-backend.onrender.com/api/auth/google/callback
   GITHUB_CALLBACK_URL=https://seu-backend.onrender.com/api/auth/github/callback
   ```

### **No Vercel (Frontend):**

1. Settings → Environment Variables
2. Atualiza:
   ```env
   VITE_API_URL=https://seu-backend.onrender.com/api
   ```

---

## 📝 **COMPARAÇÃO RÁPIDA**

| Plataforma | Grátis? | Spin Down? | Facilidade |
|------------|---------|------------|------------|
| **Render** | ✅ Sim | ⚠️ Sim (15min) | ⭐⭐⭐⭐⭐ |
| **Fly.io** | ✅ Sim | ❌ Não | ⭐⭐⭐ |
| **Cyclic** | ✅ Sim | ⚠️ Sim | ⭐⭐⭐⭐ |
| **Vercel** | ✅ Sim | ❌ Não | ⭐⭐⭐⭐⭐ |
| **Railway** | ❌ Trial | ❌ Não | ⭐⭐⭐⭐⭐ |

---

## 🎯 **RECOMENDAÇÃO FINAL**

### **Para Backend:**
- **Render** - Melhor opção gratuita
- Alternativa: **Fly.io** (se não quiseres spin down)

### **Para Frontend:**
- **Vercel** - Melhor opção (já estás a usar)

---

## ✅ **CHECKLIST RENDER**

- [ ] Conta Render criada
- [ ] Web Service criado
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Plano: **Free**
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy concluído
- [ ] URL copiado

---

## 🐛 **PROBLEMAS COMUNS NO RENDER**

### **Spin Down (Sleep)**
- Render pode "dormir" após 15 min de inatividade
- Primeira requisição pode demorar ~30s (wake up)
- Solução: Usa um serviço de "ping" (UptimeRobot grátis)

### **Build Falha**
- Verifica logs no Render
- Verifica se `npm run build` funciona localmente
- Verifica se todas as dependências estão no `package.json`

---

## 🔗 **LINKS ÚTEIS**

- [Render Docs](https://render.com/docs)
- [Render Free Tier](https://render.com/pricing)
- [UptimeRobot](https://uptimerobot.com) - Para manter acordado (grátis)

---

**Render é a melhor alternativa gratuita! 🚀**

