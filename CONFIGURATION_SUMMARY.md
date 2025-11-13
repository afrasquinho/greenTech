# ✅ Resumo da Configuração

## 📁 Ficheiros Criados

### ✅ Backend
- `backend/.env.example` - Template de variáveis de ambiente
- `backend/check-config.js` - Script de verificação de configuração

### ✅ Frontend
- `frontend/.env.example` - Template de variáveis de ambiente

### ✅ Documentação
- `SETUP_GUIDE.md` - Guia completo passo a passo
- `CONFIGURATION_SUMMARY.md` - Este ficheiro

---

## 🚀 Próximos Passos

### 1. **Criar ficheiros .env**

#### Backend:
```bash
cd backend
cp .env.example .env
# Edita .env e preenche os valores
```

#### Frontend:
```bash
cd frontend
cp .env.example .env.local
# Edita .env.local e preenche os valores
```

### 2. **Configurar variáveis obrigatórias**

#### Backend `.env` - Mínimo necessário:
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb+srv://... (ou mongodb://localhost:27017/greentech)
JWT_SECRET=... (mínimo 32 caracteres)
FRONTEND_URL=http://localhost:5173
```

#### Frontend `.env.local` - Mínimo necessário:
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. **Verificar configuração**

```bash
cd backend
npm run check-config
```

Este script vai verificar:
- ✅ Se o ficheiro `.env` existe
- ✅ Se todas as variáveis obrigatórias estão configuradas
- ✅ Se os valores parecem válidos
- ✅ Quais funcionalidades opcionais estão configuradas

### 4. **Instalar dependências** (se ainda não instalaste)

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 5. **Criar primeiro admin**

```bash
cd backend
node createAdmin.js
```

### 6. **Iniciar aplicação**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

---

## 📋 Checklist Rápido

- [ ] `backend/.env` criado a partir de `.env.example`
- [ ] `frontend/.env.local` criado a partir de `.env.example`
- [ ] `MONGODB_URI` configurado
- [ ] `JWT_SECRET` gerado (mínimo 32 caracteres)
- [ ] `FRONTEND_URL` configurado
- [ ] `VITE_API_URL` configurado
- [ ] Dependências instaladas (backend + frontend)
- [ ] Configuração verificada (`npm run check-config`)
- [ ] Primeiro admin criado
- [ ] Backend inicia sem erros
- [ ] Frontend inicia sem erros

---

## 🔧 Comandos Úteis

### Verificar configuração
```bash
cd backend
npm run check-config
```

### Gerar JWT_SECRET seguro
```bash
openssl rand -base64 32
```

### Testar MongoDB connection
```bash
# O backend vai tentar conectar automaticamente
cd backend
npm run dev
# Verifica os logs para ver se conectou
```

### Verificar se backend está a correr
```bash
curl http://localhost:3001/health
```

---

## 📚 Documentação Adicional

- **`SETUP_GUIDE.md`** - Guia completo passo a passo
- **`ENV_TEMPLATE.md`** - Todas as variáveis explicadas
- **`CREATE_ADMIN.md`** - Como criar utilizador admin
- **`MONGODB_SETUP.md`** - Configurar MongoDB
- **`GOOGLE_OAUTH_SETUP.md`** - Configurar OAuth Google
- **`OAUTH_SETUP.md`** - Configurar OAuth GitHub
- **`EMAIL_SETUP.md`** - Configurar email SMTP

---

## ⚠️ Importante

1. **Nunca commites ficheiros `.env` ou `.env.local`** - Estão no `.gitignore`
2. **JWT_SECRET deve ser único e seguro** - Mínimo 32 caracteres
3. **MongoDB URI** - Em produção, usa connection string segura
4. **Variáveis opcionais** - Podes configurar depois conforme necessário

---

## 🎉 Pronto!

Se seguiste todos os passos, a aplicação está configurada e pronta para usar!

**Dúvidas?** Consulta o `SETUP_GUIDE.md` para instruções detalhadas.

