# 🔧 Fix Railway Deploy - Railpack

O Railway está a usar Railpack e não encontrou o comando de start. Aqui está como corrigir.

---

## ❌ **PROBLEMA**

Railpack não encontrou o comando de start porque:
- O backend está na pasta `backend/`
- Railway precisa saber onde está o `package.json`
- Precisa configurar o Root Directory

---

## ✅ **SOLUÇÃO**

### **Opção 1: Configurar Root Directory (RECOMENDADO)**

1. **No Railway Dashboard:**
   - Vai ao teu projeto
   - Clica em **Settings**
   - Vai a **Source**
   - **Root Directory**: `backend`
   - Clica "Save"

2. **Railway vai re-deploy automaticamente**

3. **Verifica se funciona:**
   - Vai a **Deployments**
   - Verifica os logs
   - Deve encontrar o `package.json` agora

---

### **Opção 2: Configurar Start Command Manualmente**

Se a Opção 1 não funcionar:

1. **No Railway Dashboard:**
   - Vai ao teu projeto
   - Clica em **Settings**
   - Vai a **Deploy**
   - **Start Command**: `cd backend && npm start`
   - Clica "Save"

---

### **Opção 3: Usar railway.json (Já criado)**

O ficheiro `backend/railway.json` já existe e está configurado. Railway deve detectá-lo automaticamente.

Se não detectar:

1. **Verifica se o ficheiro existe:**
   ```bash
   ls backend/railway.json
   ```

2. **Se não existir, cria:**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS",
       "buildCommand": "npm install && npm run build"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

3. **Faz commit e push:**
   ```bash
   git add backend/railway.json
   git commit -m "Add railway.json config"
   git push origin main
   ```

---

## 🔍 **VERIFICAR CONFIGURAÇÃO**

### **1. Verificar package.json**

O `backend/package.json` deve ter:

```json
{
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc"
  },
  "main": "dist/index.js"
}
```

✅ Já está correto!

### **2. Verificar se dist/ existe após build**

O comando `npm run build` deve criar a pasta `dist/` com `index.js`.

---

## 📝 **PASSO A PASSO COMPLETO**

### **1. Configurar Root Directory**

1. Railway Dashboard → Teu Projeto → Settings → Source
2. **Root Directory**: `backend`
3. Save

### **2. Verificar Build Command**

1. Settings → Deploy
2. **Build Command**: `npm install && npm run build`
3. (Deve estar automático)

### **3. Verificar Start Command**

1. Settings → Deploy
2. **Start Command**: `npm start`
3. (Deve estar automático após configurar Root Directory)

### **4. Variáveis de Ambiente**

1. Variables → Adiciona:
   ```env
   PORT=3001
   NODE_ENV=production
   MONGODB_URI=...
   JWT_SECRET=...
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   ```

### **5. Re-deploy**

1. Deployments → Latest → "Redeploy"
2. Ou faz push novo commit:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push origin main
   ```

---

## 🐛 **SE AINDA NÃO FUNCIONAR**

### **Verificar Logs**

1. Vai a **Deployments**
2. Clica no deployment mais recente
3. Clica "View Logs"
4. Procura por erros

### **Erros Comuns**

1. **"Cannot find module"**
   - Verifica se `npm install` está a correr
   - Verifica se todas as dependências estão no `package.json`

2. **"dist/index.js not found"**
   - Verifica se `npm run build` está a correr
   - Verifica se `tsconfig.json` está correto

3. **"Port already in use"**
   - Railway atribui PORT automaticamente
   - Usa `process.env.PORT` no código (já está correto)

---

## ✅ **CHECKLIST**

- [ ] Root Directory configurado: `backend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Variáveis de ambiente configuradas
- [ ] Re-deploy feito
- [ ] Logs verificados (sem erros)
- [ ] Health check funciona: `curl https://seu-projeto.railway.app/health`

---

## 🎯 **SOLUÇÃO RÁPIDA**

**A forma mais rápida:**

1. Railway Dashboard → Settings → Source
2. **Root Directory**: `backend`
3. Save
4. Railway vai re-deploy automaticamente
5. Aguarda 2-3 minutos
6. Testa: `curl https://seu-projeto.railway.app/health`

---

**Isso deve resolver! 🚀**

