# ✅ Checklist de Variáveis de Ambiente - Produção

Use este checklist para garantir que todas as variáveis estão configuradas corretamente antes do deploy.

---

## 🔍 **Verificação Automática**

Executa o script de verificação:

```bash
node check-production-env.js
```

Ou do diretório backend:

```bash
cd backend
npm run check-production
```

---

## 📋 **CHECKLIST MANUAL**

### **Backend (Railway/Render)**

#### Obrigatórias ✅
- [ ] `PORT=3001`
- [ ] `NODE_ENV=production` (não "development"!)
- [ ] `MONGODB_URI` - Connection string de produção (MongoDB Atlas)
- [ ] `JWT_SECRET` - Mínimo 32 caracteres, único e seguro
- [ ] `JWT_EXPIRES_IN=7d`
- [ ] `FRONTEND_URL` - URL HTTPS do frontend (ex: `https://seu-app.vercel.app`)

#### Opcionais (mas recomendadas) ⚙️
- [ ] `OPENAI_API_KEY` - Se usar chat IA
- [ ] `STRIPE_SECRET_KEY` - **Live key** (`sk_live_...`) se usar pagamentos
- [ ] `STRIPE_WEBHOOK_SECRET` - Se usar Stripe
- [ ] `GOOGLE_CLIENT_ID` - Se usar OAuth Google
- [ ] `GOOGLE_CLIENT_SECRET` - Se usar OAuth Google
- [ ] `GOOGLE_CALLBACK_URL` - URL de produção (não localhost!)
- [ ] `GITHUB_CLIENT_ID` - Se usar OAuth GitHub
- [ ] `GITHUB_CLIENT_SECRET` - Se usar OAuth GitHub
- [ ] `GITHUB_CALLBACK_URL` - URL de produção (não localhost!)
- [ ] `SMTP_HOST` - Se usar email
- [ ] `SMTP_PORT` - Se usar email
- [ ] `SMTP_USER` - Se usar email
- [ ] `SMTP_PASS` - Se usar email

---

### **Frontend (Vercel/Netlify)**

#### Obrigatórias ✅
- [ ] `VITE_API_URL` - URL HTTPS do backend (ex: `https://seu-backend.railway.app/api`)

#### Opcionais ⚙️
- [ ] `VITE_GA_MEASUREMENT_ID` - Se usar Google Analytics
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` - **Live key** (`pk_live_...`) se usar pagamentos

---

## ⚠️ **VERIFICAÇÕES IMPORTANTES**

### URLs
- [ ] Todas as URLs são HTTPS (não HTTP)
- [ ] Nenhuma URL contém `localhost`
- [ ] `FRONTEND_URL` aponta para o domínio real do frontend
- [ ] `VITE_API_URL` aponta para o domínio real do backend
- [ ] OAuth callbacks apontam para URLs de produção

### Keys
- [ ] Stripe keys são **live keys** (`sk_live_`, `pk_live_`) não test keys
- [ ] `JWT_SECRET` tem mínimo 32 caracteres
- [ ] `JWT_SECRET` não contém palavras como "your-", "change-", "secret"
- [ ] MongoDB URI não contém "username" ou "password" (placeholders)

### Ambiente
- [ ] `NODE_ENV=production` (não "development")
- [ ] MongoDB URI é de produção (MongoDB Atlas, não local)

---

## 🔒 **SEGURANÇA**

- [ ] Nenhum secret está commitado no Git
- [ ] Todas as variáveis estão configuradas na plataforma (não no código)
- [ ] IP whitelist configurado no MongoDB Atlas
- [ ] CORS configurado apenas para teu domínio

---

## 📝 **ONDE CONFIGURAR**

### Railway (Backend)
1. Vai ao projeto no Railway
2. Clica em "Variables"
3. Adiciona cada variável uma a uma
4. **Importante**: Não usa `.env` file, configura diretamente

### Vercel (Frontend)
1. Vai ao projeto no Vercel
2. Settings → Environment Variables
3. Adiciona variáveis para "Production"
4. **Importante**: Variáveis `VITE_*` são expostas no browser

### Netlify (Frontend)
1. Vai ao projeto no Netlify
2. Site settings → Environment variables
3. Adiciona variáveis
4. **Importante**: Rebuild após adicionar variáveis

---

## 🧪 **TESTAR APÓS CONFIGURAR**

1. **Backend Health Check:**
   ```bash
   curl https://seu-backend.railway.app/health
   ```
   Deve retornar: `{"status":"healthy","database":"connected"}`

2. **Frontend:**
   - Abre o site
   - Verifica console do browser (sem erros)
   - Testa registo/login
   - Verifica se conecta ao backend

3. **Funcionalidades:**
   - [ ] Registo funciona
   - [ ] Login funciona
   - [ ] OAuth funciona (se configurado)
   - [ ] Chat IA funciona (se configurado)
   - [ ] Pagamentos funcionam (se configurado)
   - [ ] Email funciona (se configurado)

---

## 📚 **DOCUMENTAÇÃO**

- `PRODUCTION_ENV.md` - Guia completo de variáveis
- `check-production-env.js` - Script de verificação
- `DEPLOY_COMPLETE.md` - Guia de deploy

---

**Tudo configurado? Faz deploy! 🚀**

