# 🔧 Corrigir Variáveis de Ambiente para Produção

Baseado no output do script de verificação, aqui estão os problemas encontrados e como corrigi-los.

---

## ❌ **PROBLEMAS DETECTADOS**

### 1. **NODE_ENV não configurado**
- **Problema**: `NODE_ENV` não está definido ou não é "production"
- **Solução**: Adiciona `NODE_ENV=production` no `.env`

### 2. **FRONTEND_URL aponta para localhost**
- **Problema**: URL ainda é de desenvolvimento
- **Solução**: Atualiza para URL HTTPS de produção

### 3. **OAuth Callbacks apontam para localhost**
- **Problema**: `GOOGLE_CALLBACK_URL` e `GITHUB_CALLBACK_URL` ainda são localhost
- **Solução**: Atualiza para URLs de produção

---

## 🔧 **COMO CORRIGIR**

### **Opção 1: Atualizar `.env` localmente (para referência)**

Edita `backend/.env` e atualiza:

```env
# Muda isto:
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/github/callback

# Para isto (substitui pelos teus URLs reais):
NODE_ENV=production
FRONTEND_URL=https://seu-frontend.vercel.app
GOOGLE_CALLBACK_URL=https://seu-backend.railway.app/api/auth/google/callback
GITHUB_CALLBACK_URL=https://seu-backend.railway.app/api/auth/github/callback
```

**⚠️ IMPORTANTE**: 
- Substitui `seu-frontend.vercel.app` pelo URL real do teu frontend
- Substitui `seu-backend.railway.app` pelo URL real do teu backend
- Estas URLs só estarão disponíveis **depois** de fazer deploy

---

### **Opção 2: Configurar diretamente nas plataformas (RECOMENDADO)**

Em produção, **não** usas o ficheiro `.env`. Configuras diretamente nas plataformas:

#### **Railway (Backend)**

1. Vai ao teu projeto no [Railway Dashboard](https://railway.app)
2. Clica em "Variables"
3. Adiciona/atualiza estas variáveis:

```
NODE_ENV=production
FRONTEND_URL=https://seu-frontend.vercel.app
GOOGLE_CALLBACK_URL=https://seu-backend.railway.app/api/auth/google/callback
GITHUB_CALLBACK_URL=https://seu-backend.railway.app/api/auth/github/callback
```

**Como obter os URLs:**
- **Backend URL**: Vai ao teu projeto Railway → Settings → Domains. Copia o URL (ex: `seu-projeto.railway.app`)
- **Frontend URL**: Vai ao teu projeto Vercel → Settings → Domains. Copia o URL (ex: `seu-projeto.vercel.app`)

#### **Vercel (Frontend)**

1. Vai ao teu projeto no [Vercel Dashboard](https://vercel.com)
2. Settings → Environment Variables
3. Adiciona:

```
VITE_API_URL=https://seu-backend.railway.app/api
```

---

## 📝 **PASSO A PASSO COMPLETO**

### **Passo 1: Fazer deploy primeiro (para obter URLs)**

1. **Deploy Backend (Railway):**
   - Conecta GitHub repo
   - Railway vai fazer deploy
   - Copia o URL do backend (ex: `greentech-backend.railway.app`)

2. **Deploy Frontend (Vercel):**
   - Conecta GitHub repo
   - Vercel vai fazer deploy
   - Copia o URL do frontend (ex: `greentech-frontend.vercel.app`)

### **Passo 2: Atualizar variáveis com URLs reais**

#### **No Railway (Backend):**

Adiciona/atualiza:
```env
NODE_ENV=production
FRONTEND_URL=https://greentech-frontend.vercel.app
GOOGLE_CALLBACK_URL=https://greentech-backend.railway.app/api/auth/google/callback
GITHUB_CALLBACK_URL=https://greentech-backend.railway.app/api/auth/github/callback
```

**E todas as outras variáveis obrigatórias:**
```env
PORT=3001
MONGODB_URI=mongodb+srv://... (tua connection string)
JWT_SECRET=... (tua chave secreta)
JWT_EXPIRES_IN=7d
```

#### **No Vercel (Frontend):**

Adiciona:
```env
VITE_API_URL=https://greentech-backend.railway.app/api
```

### **Passo 3: Atualizar OAuth Providers**

#### **Google OAuth:**

1. Vai a [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services → Credentials
3. Edita o teu OAuth Client
4. **Authorized redirect URIs**: Adiciona
   ```
   https://greentech-backend.railway.app/api/auth/google/callback
   ```
5. **Authorized JavaScript origins**: Adiciona
   ```
   https://greentech-frontend.vercel.app
   ```

#### **GitHub OAuth:**

1. Vai a [GitHub Settings → Developer settings](https://github.com/settings/developers)
2. OAuth Apps → Edita a tua app
3. **Authorization callback URL**: Atualiza para
   ```
   https://greentech-backend.railway.app/api/auth/github/callback
   ```
4. **Homepage URL**: Atualiza para
   ```
   https://greentech-frontend.vercel.app
   ```

### **Passo 4: Verificar novamente**

Depois de configurar tudo, verifica:

```bash
node check-production-env.js
```

Ou se já tens o `.env` atualizado localmente (só para referência):

```bash
cd backend
npm run check-production
```

---

## ⚠️ **IMPORTANTE**

1. **URLs só existem depois do deploy**: Não podes configurar URLs de produção antes de fazer deploy
2. **Ordem recomendada**:
   - Faz deploy do backend primeiro
   - Faz deploy do frontend
   - Copia os URLs
   - Atualiza variáveis de ambiente
   - Atualiza OAuth providers
   - Testa tudo

3. **Não uses `.env` em produção**: Configura diretamente nas plataformas (Railway/Vercel)

4. **Re-deploy após mudanças**: Algumas plataformas requerem re-deploy após mudar variáveis

---

## ✅ **CHECKLIST FINAL**

- [ ] Backend deployado no Railway
- [ ] Frontend deployado no Vercel
- [ ] URLs copiados (backend e frontend)
- [ ] `NODE_ENV=production` configurado no Railway
- [ ] `FRONTEND_URL` atualizado no Railway (URL real)
- [ ] `GOOGLE_CALLBACK_URL` atualizado no Railway (URL real)
- [ ] `GITHUB_CALLBACK_URL` atualizado no Railway (URL real)
- [ ] `VITE_API_URL` configurado no Vercel (URL real do backend)
- [ ] Google OAuth atualizado com URLs de produção
- [ ] GitHub OAuth atualizado com URLs de produção
- [ ] Verificação executada: `node check-production-env.js`
- [ ] Tudo funciona em produção

---

## 🧪 **TESTAR**

Depois de configurar tudo:

1. **Backend Health:**
   ```bash
   curl https://seu-backend.railway.app/health
   ```

2. **Frontend:**
   - Abre o site
   - Testa registo/login
   - Verifica se conecta ao backend

3. **OAuth:**
   - Testa login com Google
   - Testa login com GitHub

---

**Boa sorte! 🚀**

