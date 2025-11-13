# 🚀 Deploy Agora - Vercel + Railway

Guia passo a passo para fazer deploy imediatamente.

---

## 📋 **PRÉ-REQUISITOS**

- [x] Código commitado no GitHub
- [x] Conta GitHub
- [x] MongoDB Atlas configurado (ou connection string pronta)

---

## ⚙️ **PARTE 1: Deploy Backend (Render - GRATUITO)** ⭐

**Nota**: Railway agora é trial apenas. Usa **Render** que é 100% grátis!

### **Passo 1: Criar Conta Render**

1. Vai a [render.com](https://render.com)
2. Clica "Get Started for Free"
3. Login com GitHub
4. Autoriza Render a aceder aos teus repositórios

### **Passo 2: Criar Web Service**

1. Dashboard → "New +" → "Web Service"
2. Conecta o repositório `greenTech` (ou o nome do teu repo)
3. Configura:
   - **Name**: `greentech-backend`
   - **Environment**: `Node`
   - **Region**: Escolhe o mais próximo
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: **Free** (não Starter!)

### **Passo 3: Configurar Variáveis de Ambiente**

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

### **Passo 4: Criar e Deploy**

1. Clica "Create Web Service"
2. Render vai fazer deploy automaticamente
3. Aguarda 5-10 minutos

### **Passo 5: Obter URL do Backend**

1. Quando o deploy terminar, vais ver o URL
2. Formato: `greentech-backend.onrender.com`
3. **COPIA ESTE URL** - vais precisar!

**⚠️ Nota**: Render pode "dormir" após 15 min de inatividade. Primeira requisição pode demorar ~30s.

### **Passo 6: Verificar Deploy**

1. Vai a **Deployments** para ver o progresso
2. Quando estiver "Active", testa:
   ```bash
   curl https://seu-projeto.railway.app/health
   ```
3. Deve retornar: `{"status":"healthy","database":"connected"}`

---

## 🎨 **PARTE 2: Deploy Frontend (Vercel)**

### **Passo 1: Criar Conta Vercel**

1. Vai a [vercel.com](https://vercel.com)
2. Clica "Sign Up"
3. Login com GitHub
4. Autoriza Vercel a aceder aos teus repositórios

### **Passo 2: Criar Projeto**

1. Clica "Add New Project"
2. Importa o repositório `greenHours`
3. Configura:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (já vem preenchido)
   - **Output Directory**: `dist` (já vem preenchido)
   - **Install Command**: `npm install` (já vem preenchido)

### **Passo 3: Configurar Variáveis de Ambiente**

1. Antes de fazer deploy, clica em **Environment Variables**
2. Adiciona:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```
   **⚠️ Temporário** - vamos atualizar depois com o URL real do backend

3. Clica "Save"

### **Passo 4: Fazer Deploy**

1. Clica "Deploy"
2. Vercel vai fazer build e deploy automaticamente
3. Aguarda alguns minutos

### **Passo 5: Obter URL do Frontend**

1. Quando o deploy terminar, vais ver o URL
2. Formato: `seu-projeto.vercel.app`
3. **COPIA ESTE URL** - vais precisar!

---

## 🔄 **PARTE 3: Atualizar URLs**

Agora que tens ambos os URLs, atualiza as variáveis:

### **No Render (Backend):**

1. Vai ao teu serviço → **Environment**
2. Atualiza:
   ```env
   FRONTEND_URL=https://seu-projeto.vercel.app
   GOOGLE_CALLBACK_URL=https://seu-backend.onrender.com/api/auth/google/callback
   GITHUB_CALLBACK_URL=https://seu-backend.onrender.com/api/auth/github/callback
   ```
3. Substitui pelos URLs reais que copiaste!

### **No Vercel (Frontend):**

1. Vai a **Settings** → **Environment Variables**
2. Atualiza:
   ```env
   VITE_API_URL=https://seu-backend.onrender.com/api
   ```
3. Substitui pelo URL real do backend!

4. **Re-deploy**: Vai a Deployments → Latest → "Redeploy"

---

## ✅ **TESTAR**

### **1. Backend Health Check**

```bash
curl https://seu-backend.onrender.com/health
```

Deve retornar:
```json
{"status":"healthy","database":"connected"}
```

### **2. Frontend**

1. Abre `https://seu-projeto.vercel.app`
2. Verifica console do browser (F12) - sem erros
3. Testa registo/login
4. Verifica se conecta ao backend

---

## 🐛 **PROBLEMAS COMUNS**

### **Backend não inicia**
- Verifica logs no Railway (Deployments → View Logs)
- Verifica se `MONGODB_URI` está correto
- Verifica se `JWT_SECRET` está configurado

### **Frontend não conecta ao backend**
- Verifica `VITE_API_URL` no Vercel
- Verifica se backend está a correr
- Verifica CORS (deve estar configurado automaticamente)

### **CORS errors**
- Certifica-te que `FRONTEND_URL` no Railway é o URL correto do frontend
- Verifica se é HTTPS (não HTTP)

---

## 📝 **CHECKLIST**

- [ ] Conta Render criada
- [ ] Backend deployado no Render (plano Free)
- [ ] URL do backend copiado
- [ ] Backend health check funciona
- [ ] Conta Vercel criada
- [ ] Frontend deployado no Vercel
- [ ] URL do frontend copiado
- [ ] `FRONTEND_URL` atualizado no Railway
- [ ] `VITE_API_URL` atualizado no Vercel
- [ ] Frontend conecta ao backend
- [ ] Registo/Login funciona

---

## 🎉 **PRONTO!**

A aplicação está em produção! 🚀

**Próximos passos:**
- Configurar OAuth providers (se usar)
- Adicionar domínio customizado (opcional)
- Configurar monitoramento

---

**Bom deploy! 🚀**

