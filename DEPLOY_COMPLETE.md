# 🚀 Guia Completo de Deploy - GreenTech Solutions

Este guia cobre o deploy completo da aplicação (frontend + backend) para produção.

---

## 📋 **Pré-requisitos**

- [x] Aplicação testada localmente
- [x] Conta GitHub (recomendado)
- [x] Variáveis de ambiente configuradas
- [x] Build de produção testado

---

## 🎯 **Opções de Deploy Recomendadas**

### **Opção 1: Vercel (Frontend) + Railway (Backend)** ⭐ RECOMENDADO
- ✅ Grátis para começar
- ✅ Deploy automático via Git
- ✅ HTTPS automático
- ✅ Fácil configuração

### **Opção 2: Netlify (Frontend) + Render (Backend)**
- ✅ Grátis
- ✅ Boa performance
- ✅ Fácil setup

### **Opção 3: Vercel (Frontend + Backend)**
- ✅ Tudo numa plataforma
- ✅ Deploy simples
- ⚠️ Backend pode ter limitações

---

## 🎨 **PARTE 1: Deploy do Frontend**

### **Opção A: Vercel** (Recomendado)

#### 1.1. Preparar Frontend

```bash
cd frontend
npm run build
# Testa localmente se o build funciona
```

#### 1.2. Deploy via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod
```

#### 1.3. Deploy via GitHub (Recomendado)

1. **Push para GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deploy"
   git push origin main
   ```

2. **Conectar no Vercel:**
   - Vai a [vercel.com](https://vercel.com)
   - Clica "Add New Project"
   - Importa o repositório GitHub
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: Vite

3. **Configurar Variáveis de Ambiente:**
   - Vai a Settings → Environment Variables
   - Adiciona:
     ```
     VITE_API_URL=https://seu-backend.railway.app/api
     VITE_GA_MEASUREMENT_ID=G-... (opcional)
     VITE_STRIPE_PUBLISHABLE_KEY=pk_... (se usar)
     ```

4. **Deploy automático:**
   - Cada push para `main` faz deploy automático
   - URL: `https://seu-projeto.vercel.app`

---

### **Opção B: Netlify**

#### 1.1. Preparar Frontend

```bash
cd frontend
npm run build
```

#### 1.2. Deploy via Netlify CLI

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
cd frontend
netlify deploy --prod --dir=dist
```

#### 1.3. Deploy via GitHub

1. Vai a [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Conecta GitHub
4. Configurações:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
5. Adiciona variáveis de ambiente (Site settings → Environment variables)

---

## ⚙️ **PARTE 2: Deploy do Backend**

### **Opção A: Railway** (Recomendado)

#### 2.1. Preparar Backend

```bash
cd backend
npm run build
# Verifica se dist/ foi criado
```

#### 2.2. Deploy via Railway

1. **Criar conta:**
   - Vai a [railway.app](https://railway.app)
   - Login com GitHub

2. **Criar novo projeto:**
   - "New Project" → "Deploy from GitHub repo"
   - Seleciona o repositório
   - Railway detecta automaticamente Node.js

3. **Configurar:**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Port: Railway atribui automaticamente (usa `PORT` env var)

4. **Variáveis de Ambiente:**
   - Vai a Variables
   - Adiciona todas as variáveis do `.env`:
     ```
     PORT=3001
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://...
     JWT_SECRET=...
     FRONTEND_URL=https://seu-frontend.vercel.app
     OPENAI_API_KEY=sk-...
     STRIPE_SECRET_KEY=sk_...
     # etc...
     ```

5. **Domínio:**
   - Railway atribui um domínio grátis: `seu-projeto.railway.app`
   - Podes adicionar domínio customizado

6. **Webhook Stripe (se usar):**
   - Vai a Stripe Dashboard → Webhooks
   - Adiciona endpoint: `https://seu-backend.railway.app/api/payments/webhook`
   - Copia o webhook secret para Railway env vars

---

### **Opção B: Render**

#### 2.1. Deploy via Render

1. **Criar conta:**
   - Vai a [render.com](https://render.com)
   - Login com GitHub

2. **Criar Web Service:**
   - "New" → "Web Service"
   - Conecta repositório GitHub
   - Configurações:
     - Name: `greentech-backend`
     - Environment: Node
     - Build Command: `cd backend && npm install && npm run build`
     - Start Command: `cd backend && npm start`
     - Root Directory: `backend`

3. **Variáveis de Ambiente:**
   - Vai a Environment
   - Adiciona todas as variáveis

4. **Plano:**
   - Free tier disponível (pode ter limitações)
   - Pode "spin down" após inatividade

---

### **Opção C: Vercel (Backend também)**

#### 2.1. Deploy Backend no Vercel

1. **Criar novo projeto:**
   - Vai a Vercel Dashboard
   - "Add New Project"
   - Importa o mesmo repositório
   - Root Directory: `backend`

2. **Configurar:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Framework: Other

3. **Variáveis de Ambiente:**
   - Adiciona todas as variáveis

**Nota:** Vercel é otimizado para frontend. Para backend, Railway ou Render são melhores.

---

## 🔧 **PARTE 3: Configuração Pós-Deploy**

### 3.1. Atualizar URLs

#### Backend:
```env
FRONTEND_URL=https://seu-frontend.vercel.app
GOOGLE_CALLBACK_URL=https://seu-backend.railway.app/api/auth/google/callback
GITHUB_CALLBACK_URL=https://seu-backend.railway.app/api/auth/github/callback
```

#### Frontend:
```env
VITE_API_URL=https://seu-backend.railway.app/api
```

### 3.2. Configurar CORS

O backend já está configurado para aceitar o `FRONTEND_URL`. Verifica se está correto.

### 3.3. Testar Endpoints

```bash
# Health check
curl https://seu-backend.railway.app/health

# Deve retornar:
# {"status":"healthy","database":"connected"}
```

### 3.4. Testar Frontend

1. Abre `https://seu-frontend.vercel.app`
2. Testa registo/login
3. Verifica se conecta ao backend
4. Testa funcionalidades principais

---

## 🔐 **PARTE 4: Segurança em Produção**

### 4.1. Checklist de Segurança

- [ ] `NODE_ENV=production` configurado
- [ ] `JWT_SECRET` forte e único
- [ ] CORS configurado apenas para o teu domínio
- [ ] HTTPS ativo (automático em Vercel/Railway)
- [ ] Secrets nunca commitados no Git
- [ ] Rate limiting implementado (recomendado)
- [ ] MongoDB com IP whitelist (se possível)

### 4.2. Rate Limiting (Recomendado)

Adiciona ao backend:

```bash
cd backend
npm install express-rate-limit
```

Cria `backend/src/middleware/rateLimit.ts`:
```typescript
import rateLimit from 'express-rate-limit'

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // máximo 5 tentativas de login
})
```

---

## 📊 **PARTE 5: Monitoramento**

### 5.1. Health Checks

O backend já tem endpoint `/health`. Configura monitoramento:

- **UptimeRobot** (grátis): Monitora `https://seu-backend.railway.app/health`
- **Better Uptime**: Alternativa moderna

### 5.2. Error Tracking

- **Sentry** (recomendado): Tracking de erros
- **LogRocket**: Session replay

### 5.3. Analytics

- **Google Analytics**: Já configurado no frontend
- **Vercel Analytics**: Se usar Vercel

---

## 🐛 **Troubleshooting**

### Backend não inicia

1. Verifica logs no Railway/Render
2. Verifica se todas as env vars estão configuradas
3. Verifica se `npm run build` funciona localmente
4. Verifica se `PORT` está correto

### Frontend não conecta ao backend

1. Verifica `VITE_API_URL` no frontend
2. Verifica CORS no backend (`FRONTEND_URL`)
3. Verifica se backend está a correr
4. Verifica console do browser para erros

### MongoDB não conecta

1. Verifica `MONGODB_URI` em produção
2. Verifica IP whitelist no MongoDB Atlas
3. Adiciona IP do Railway/Render ao whitelist

### Build falha

1. Verifica logs de build
2. Testa build localmente: `npm run build`
3. Verifica se todas as dependências estão no `package.json`
4. Limpa cache: `rm -rf node_modules package-lock.json && npm install`

---

## ✅ **Checklist Final**

### Pré-Deploy
- [ ] Código testado localmente
- [ ] Build funciona (`npm run build`)
- [ ] Variáveis de ambiente documentadas
- [ ] Secrets não commitados
- [ ] README atualizado

### Deploy Frontend
- [ ] Frontend deployado
- [ ] Variáveis de ambiente configuradas
- [ ] URL funcionando
- [ ] HTTPS ativo

### Deploy Backend
- [ ] Backend deployado
- [ ] Todas as variáveis configuradas
- [ ] MongoDB conectado
- [ ] Health check funcionando
- [ ] CORS configurado

### Pós-Deploy
- [ ] Frontend conecta ao backend
- [ ] Registo/Login funciona
- [ ] Funcionalidades principais testadas
- [ ] Monitoramento configurado
- [ ] Domínio customizado (se necessário)

---

## 🎉 **Deploy Concluído!**

A aplicação está em produção! 🚀

**Próximos passos:**
1. Configurar domínio customizado
2. Configurar monitoramento
3. Configurar backups
4. Otimizar performance

---

## 📚 **Recursos Úteis**

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Bom deploy! 🚀**

