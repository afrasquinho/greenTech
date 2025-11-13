# 🚀 Deploy Frontend no Vercel - Passo a Passo

Guia rápido para fazer deploy do frontend no Vercel.

---

## 📋 **PRÉ-REQUISITOS**

- [x] Código no GitHub
- [x] Backend já deployado: `https://greentech-49d3.onrender.com`
- [x] Build funciona localmente

---

## 🎯 **PASSO A PASSO**

### **1. Criar Conta Vercel**

1. Vai a [vercel.com](https://vercel.com)
2. Clica "Sign Up" ou "Login"
3. **Login com GitHub** (recomendado)
4. Autoriza Vercel a aceder aos teus repositórios

---

### **2. Criar Novo Projeto**

1. No Dashboard, clica **"Add New Project"**
2. **Importa o repositório:**
   - Seleciona `greenTech` (ou o nome do teu repo)
   - Clica "Import"

---

### **3. Configurar Projeto**

Vercel vai detectar automaticamente, mas verifica:

- **Project Name**: `greentech-frontend` (ou o nome que quiseres)
- **Framework Preset**: `Vite` (deve detectar automaticamente)
- **Root Directory**: `frontend` ⚠️ **IMPORTANTE!**
- **Build Command**: `npm run build` (já vem preenchido)
- **Output Directory**: `dist` (já vem preenchido)
- **Install Command**: `npm install` (já vem preenchido)

---

### **4. Configurar Variáveis de Ambiente**

**ANTES de fazer deploy**, clica em **"Environment Variables"**:

1. Clica **"Add"** ou **"Add Variable"**
2. Adiciona:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://greentech-49d3.onrender.com/api`
   - **Environment**: Seleciona todas (Production, Preview, Development)
3. Clica **"Save"**

**Opcional** (se usares):
- `VITE_GA_MEASUREMENT_ID` - Google Analytics
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe (se usar)

---

### **5. Fazer Deploy**

1. Clica **"Deploy"**
2. Vercel vai:
   - Instalar dependências
   - Fazer build
   - Deploy
3. Aguarda 2-5 minutos

---

### **6. Obter URL do Frontend**

1. Quando o deploy terminar, vais ver o URL
2. Formato: `greentech-frontend.vercel.app` (ou similar)
3. **COPIA ESTE URL** - vais precisar!

---

## 🔄 **PASSO 7: Atualizar URLs**

Agora que tens ambos os URLs:

### **No Render (Backend):**

1. Vai ao teu serviço no Render
2. **Environment** → Edita variáveis
3. Atualiza `FRONTEND_URL`:
   ```env
   FRONTEND_URL=https://seu-frontend.vercel.app
   ```
4. Substitui pelo URL real que copiaste do Vercel!

---

## ✅ **TESTAR**

### **1. Frontend**

1. Abre o URL do Vercel no browser
2. Verifica se carrega
3. Abre Console (F12) - sem erros

### **2. Integração**

1. Testa registo/login
2. Verifica se conecta ao backend
3. Testa funcionalidades principais

---

## 🐛 **PROBLEMAS COMUNS**

### **Build falha**

- Verifica se `Root Directory` está como `frontend`
- Verifica se `VITE_API_URL` está configurado
- Verifica logs no Vercel

### **Frontend não conecta ao backend**

- Verifica `VITE_API_URL` no Vercel
- Verifica se backend está a correr
- Verifica CORS no backend (`FRONTEND_URL`)

---

## 📝 **CHECKLIST**

- [ ] Conta Vercel criada
- [ ] Projeto criado
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] `VITE_API_URL` configurado
- [ ] Deploy concluído
- [ ] URL do frontend copiado
- [ ] `FRONTEND_URL` atualizado no Render
- [ ] Frontend conecta ao backend
- [ ] Tudo funciona!

---

## 🎉 **PRONTO!**

Depois disto, a aplicação está 100% em produção! 🚀

**URLs finais:**
- Backend: `https://greentech-49d3.onrender.com`
- Frontend: `https://seu-frontend.vercel.app`

---

**Bom deploy! 🚀**

