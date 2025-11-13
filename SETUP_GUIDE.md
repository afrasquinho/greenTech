# 🚀 Guia de Configuração - GreenTech Solutions

Este guia vai ajudar-te a configurar a aplicação passo a passo.

---

## 📋 **Pré-requisitos**

- ✅ Node.js v18+ instalado
- ✅ npm ou yarn instalado
- ✅ Git instalado
- ✅ Conta MongoDB Atlas (ou MongoDB local)

---

## 🔧 **PASSO 1: Configurar Backend**

### 1.1. Criar ficheiro `.env`

```bash
cd backend
cp .env.example .env
```

### 1.2. Configurar variáveis obrigatórias

Edita `backend/.env` e configura:

#### **MongoDB** (OBRIGATÓRIO)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority
```

**Como obter:**
1. Vai a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Cria uma conta (grátis)
3. Cria um cluster (gratuito)
4. Cria um utilizador de base de dados
5. Whitelist o IP (0.0.0.0/0 para desenvolvimento)
6. Copia a connection string

**Ou usa MongoDB local:**
```env
MONGODB_URI=mongodb://localhost:27017/greentech
```

#### **JWT Secret** (OBRIGATÓRIO)
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Gera uma chave segura:**
```bash
openssl rand -base64 32
```

#### **Frontend URL** (OBRIGATÓRIO)
```env
FRONTEND_URL=http://localhost:5173
```

### 1.3. Variáveis opcionais (configurar depois se necessário)

- `OPENAI_API_KEY` - Para chat IA real
- `STRIPE_SECRET_KEY` - Para pagamentos
- `GOOGLE_CLIENT_ID/SECRET` - Para OAuth Google
- `GITHUB_CLIENT_ID/SECRET` - Para OAuth GitHub
- `SMTP_*` - Para envio de emails

---

## 🎨 **PASSO 2: Configurar Frontend**

### 2.1. Criar ficheiro `.env.local`

```bash
cd frontend
cp .env.example .env.local
```

### 2.2. Configurar variáveis

Edita `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3001/api
```

**Opcional:**
- `VITE_GA_MEASUREMENT_ID` - Google Analytics
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe (se usar pagamentos)

---

## 📦 **PASSO 3: Instalar Dependências**

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

---

## 🗄️ **PASSO 4: Verificar MongoDB**

### 4.1. Testar conexão

O backend vai tentar conectar automaticamente quando iniciar. Verifica os logs:

```bash
cd backend
npm run dev
```

Deves ver:
```
✅ Connected to MongoDB
```

Se não conectar:
- Verifica a `MONGODB_URI` no `.env`
- Verifica se o IP está whitelisted no MongoDB Atlas
- Verifica se o utilizador tem permissões

---

## 👤 **PASSO 5: Criar Primeiro Admin**

### 5.1. Usar script Node.js (Recomendado)

```bash
cd backend
node createAdmin.js
```

Segue as instruções no terminal.

### 5.2. Ou criar manualmente via MongoDB

Ver `CREATE_ADMIN.md` para instruções detalhadas.

---

## 🚀 **PASSO 6: Iniciar Aplicação**

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Deves ver:
```
🚀 Server running on http://localhost:3001
📦 MongoDB: ✅ Connected
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Deves ver:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## ✅ **PASSO 7: Verificar Funcionamento**

### 7.1. Testar Backend
Abre no browser: http://localhost:3001/health

Deves ver:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### 7.2. Testar Frontend
Abre no browser: http://localhost:5173

Deves ver a homepage.

### 7.3. Testar Registo/Login
1. Clica em "Login" ou "Registo"
2. Cria uma conta
3. Verifica se faz login com sucesso

---

## 🔐 **PASSO 8: Configurações Opcionais**

### 8.1. OpenAI (Chat IA)
1. Vai a [OpenAI Platform](https://platform.openai.com)
2. Cria conta e gera API key
3. Adiciona em `backend/.env`:
   ```env
   OPENAI_API_KEY=sk-proj-...
   ```

### 8.2. Stripe (Pagamentos)
1. Vai a [Stripe Dashboard](https://dashboard.stripe.com)
2. Cria conta e obtém API keys
3. Adiciona em `backend/.env`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
4. Adiciona em `frontend/.env.local`:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

### 8.3. OAuth Google
Ver `GOOGLE_OAUTH_SETUP.md`

### 8.4. OAuth GitHub
Ver `OAUTH_SETUP.md`

### 8.5. Email SMTP
Ver `EMAIL_SETUP.md`

---

## 🐛 **Resolução de Problemas**

### Backend não inicia
- ✅ Verifica se `PORT` não está em uso
- ✅ Verifica se todas as dependências estão instaladas
- ✅ Verifica logs de erro

### MongoDB não conecta
- ✅ Verifica `MONGODB_URI` no `.env`
- ✅ Verifica se o IP está whitelisted
- ✅ Verifica se o utilizador existe e tem permissões
- ✅ Testa a connection string no MongoDB Compass

### Frontend não conecta ao backend
- ✅ Verifica se o backend está a correr
- ✅ Verifica `VITE_API_URL` no `.env.local`
- ✅ Verifica CORS no backend
- ✅ Verifica console do browser para erros

### Erro de autenticação
- ✅ Verifica se `JWT_SECRET` está configurado
- ✅ Verifica se o token está a ser enviado no header
- ✅ Verifica se o utilizador existe na base de dados

---

## 📝 **Checklist de Configuração**

- [ ] Backend `.env` criado e configurado
- [ ] Frontend `.env.local` criado e configurado
- [ ] MongoDB conectado
- [ ] Dependências instaladas (backend + frontend)
- [ ] Primeiro admin criado
- [ ] Backend inicia sem erros
- [ ] Frontend inicia sem erros
- [ ] Health check do backend funciona
- [ ] Registo/Login funciona
- [ ] (Opcional) OpenAI configurado
- [ ] (Opcional) Stripe configurado
- [ ] (Opcional) OAuth configurado

---

## 🎉 **Pronto!**

Se todos os passos foram concluídos, a aplicação está configurada e pronta para usar!

**Próximos passos:**
- Criar projetos
- Escrever artigos no blog
- Configurar pagamentos (se necessário)
- Fazer deploy para produção

---

**Precisa de ajuda?** Verifica os ficheiros de documentação:
- `ENV_TEMPLATE.md` - Todas as variáveis de ambiente
- `CREATE_ADMIN.md` - Criar utilizador admin
- `GOOGLE_OAUTH_SETUP.md` - Configurar OAuth Google
- `OAUTH_SETUP.md` - Configurar OAuth GitHub
- `EMAIL_SETUP.md` - Configurar email SMTP
- `MONGODB_SETUP.md` - Configurar MongoDB

