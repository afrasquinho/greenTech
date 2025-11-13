# 🚀 Deploy Primeiro - Obter URLs de Produção

Como ainda não tens os URLs de produção, vamos fazer deploy primeiro para os obter, e depois configuramos as variáveis.

---

## 📋 **ESTRATÉGIA**

1. **Fazer deploy com variáveis temporárias** (para obter URLs)
2. **Copiar os URLs** gerados
3. **Atualizar variáveis** com URLs reais
4. **Re-deploy** (se necessário)

---

## 🎯 **PASSO 1: Deploy do Backend (Railway)**

### 1.1. Preparar Backend

```bash
cd backend
npm run build
# Verifica se dist/ foi criado
```

### 1.2. Deploy no Railway

1. **Criar conta:**
   - Vai a [railway.app](https://railway.app)
   - Login com GitHub

2. **Criar projeto:**
   - "New Project" → "Deploy from GitHub repo"
   - Seleciona o teu repositório
   - Railway detecta automaticamente Node.js

3. **Configurar:**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Variáveis MÍNIMAS para primeiro deploy:**
   
   Vai a Variables e adiciona:
   ```env
   PORT=3001
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://... (tua connection string)
   JWT_SECRET=... (tua chave secreta - mínimo 32 caracteres)
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   ```
   
   **⚠️ Nota**: `FRONTEND_URL` temporário, vamos atualizar depois.

5. **Obter URL do Backend:**
   - Vai a Settings → Domains
   - Railway atribui um URL grátis: `seu-projeto.railway.app`
   - **COPIA ESTE URL** (vais precisar!)

---

## 🎨 **PASSO 2: Deploy do Frontend (Vercel)**

### 2.1. Preparar Frontend

```bash
cd frontend
npm run build
# Verifica se dist/ foi criado
```

### 2.2. Deploy no Vercel

1. **Criar conta:**
   - Vai a [vercel.com](https://vercel.com)
   - Login com GitHub

2. **Criar projeto:**
   - "Add New Project"
   - Importa o teu repositório GitHub
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: Vite

3. **Variável MÍNIMA para primeiro deploy:**
   
   Vai a Settings → Environment Variables:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```
   
   **⚠️ Nota**: Temporário, vamos atualizar depois.

4. **Obter URL do Frontend:**
   - Vercel atribui um URL: `seu-projeto.vercel.app`
   - **COPIA ESTE URL** (vais precisar!)

---

## 🔄 **PASSO 3: Atualizar Variáveis com URLs Reais**

Agora que tens os URLs, atualiza as variáveis:

### 3.1. No Railway (Backend)

Vai a Variables e atualiza:

```env
FRONTEND_URL=https://seu-projeto.vercel.app
GOOGLE_CALLBACK_URL=https://seu-projeto.railway.app/api/auth/google/callback
GITHUB_CALLBACK_URL=https://seu-projeto.railway.app/api/auth/github/callback
```

**E adiciona todas as outras variáveis que precisas:**
- `OPENAI_API_KEY` (se usar)
- `STRIPE_SECRET_KEY` (se usar)
- `GOOGLE_CLIENT_ID` (se usar OAuth)
- etc.

### 3.2. No Vercel (Frontend)

Vai a Settings → Environment Variables e atualiza:

```env
VITE_API_URL=https://seu-projeto.railway.app/api
```

**E adiciona outras se precisares:**
- `VITE_GA_MEASUREMENT_ID` (se usar)
- `VITE_STRIPE_PUBLISHABLE_KEY` (se usar)

### 3.3. Re-deploy (se necessário)

Algumas plataformas requerem re-deploy após mudar variáveis:
- **Railway**: Geralmente atualiza automaticamente
- **Vercel**: Pode precisar de "Redeploy" manual

---

## 📝 **TEMPLATE DE VARIÁVEIS - PRIMEIRO DEPLOY**

### Backend (Railway) - Mínimo para começar:

```env
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**Depois do deploy, atualiza:**
```env
FRONTEND_URL=https://seu-projeto.vercel.app
GOOGLE_CALLBACK_URL=https://seu-projeto.railway.app/api/auth/google/callback
GITHUB_CALLBACK_URL=https://seu-projeto.railway.app/api/auth/github/callback
```

### Frontend (Vercel) - Mínimo para começar:

```env
VITE_API_URL=http://localhost:3001/api
```

**Depois do deploy, atualiza:**
```env
VITE_API_URL=https://seu-projeto.railway.app/api
```

---

## ✅ **CHECKLIST COMPLETO**

### Antes do Deploy
- [ ] Backend build funciona: `cd backend && npm run build`
- [ ] Frontend build funciona: `cd frontend && npm run build`
- [ ] MongoDB Atlas configurado
- [ ] `JWT_SECRET` gerado (mínimo 32 caracteres)

### Deploy Backend
- [ ] Conta Railway criada
- [ ] Projeto criado e conectado ao GitHub
- [ ] Variáveis mínimas configuradas
- [ ] Deploy concluído
- [ ] URL do backend copiado

### Deploy Frontend
- [ ] Conta Vercel criada
- [ ] Projeto criado e conectado ao GitHub
- [ ] Variável `VITE_API_URL` configurada (temporária)
- [ ] Deploy concluído
- [ ] URL do frontend copiado

### Após Deploy
- [ ] `FRONTEND_URL` atualizado no Railway
- [ ] `VITE_API_URL` atualizado no Vercel
- [ ] OAuth callbacks atualizados (se usar OAuth)
- [ ] OAuth providers atualizados (Google/GitHub)
- [ ] Testado: Backend health check funciona
- [ ] Testado: Frontend conecta ao backend
- [ ] Testado: Registo/Login funciona

---

## 🧪 **TESTAR APÓS DEPLOY**

### 1. Backend Health Check

```bash
curl https://seu-projeto.railway.app/health
```

Deve retornar:
```json
{"status":"healthy","database":"connected"}
```

### 2. Frontend

- Abre `https://seu-projeto.vercel.app`
- Verifica console do browser (sem erros)
- Testa registo/login
- Verifica se conecta ao backend

---

## 🔄 **ATUALIZAR OAUTH PROVIDERS**

Depois de ter os URLs, atualiza:

### Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services → Credentials
3. Edita OAuth Client
4. **Authorized redirect URIs**: Adiciona
   ```
   https://seu-projeto.railway.app/api/auth/google/callback
   ```
5. **Authorized JavaScript origins**: Adiciona
   ```
   https://seu-projeto.vercel.app
   ```

### GitHub OAuth

1. [GitHub Settings → Developer settings](https://github.com/settings/developers)
2. OAuth Apps → Edita app
3. **Authorization callback URL**: 
   ```
   https://seu-projeto.railway.app/api/auth/github/callback
   ```
4. **Homepage URL**:
   ```
   https://seu-projeto.vercel.app
   ```

---

## 🐛 **PROBLEMAS COMUNS**

### Backend não inicia
- Verifica logs no Railway
- Verifica se `MONGODB_URI` está correto
- Verifica se `JWT_SECRET` está configurado

### Frontend não conecta ao backend
- Verifica `VITE_API_URL` no Vercel
- Verifica CORS no backend (`FRONTEND_URL`)
- Verifica se backend está a correr

### CORS errors
- Certifica-te que `FRONTEND_URL` no backend é o URL correto do frontend
- Verifica se é HTTPS (não HTTP)

---

## 📚 **PRÓXIMOS PASSOS**

Depois de ter tudo funcionando:

1. **Configurar domínio customizado** (opcional)
2. **Adicionar funcionalidades opcionais** (Stripe, OAuth, etc.)
3. **Configurar monitoramento**
4. **Otimizar performance**

---

**Bom deploy! 🚀**

