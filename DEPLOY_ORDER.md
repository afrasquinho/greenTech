# 📋 Ordem Correta de Deploy

Guia rápido da ordem correta para fazer deploy quando ainda não tens URLs de produção.

---

## 🎯 **ORDEM RECOMENDADA**

```
1. Deploy Backend → Obter URL do backend
2. Deploy Frontend → Obter URL do frontend  
3. Atualizar variáveis com URLs reais
4. Atualizar OAuth providers (se usar)
5. Testar tudo
```

---

## ⚡ **QUICK START**

### **1. Deploy Backend (Railway)**

**Variáveis mínimas para começar:**
```env
PORT=3001
NODE_ENV=production
MONGODB_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173  # Temporário
```

**Depois do deploy:**
- Copia URL: `https://seu-backend.railway.app`

---

### **2. Deploy Frontend (Vercel)**

**Variável mínima para começar:**
```env
VITE_API_URL=http://localhost:3001/api  # Temporário
```

**Depois do deploy:**
- Copia URL: `https://seu-frontend.vercel.app`

---

### **3. Atualizar Variáveis**

#### **No Railway (Backend):**
```env
FRONTEND_URL=https://seu-frontend.vercel.app
GOOGLE_CALLBACK_URL=https://seu-backend.railway.app/api/auth/google/callback
GITHUB_CALLBACK_URL=https://seu-backend.railway.app/api/auth/github/callback
```

#### **No Vercel (Frontend):**
```env
VITE_API_URL=https://seu-backend.railway.app/api
```

---

### **4. Atualizar OAuth (se usar)**

- Google: Adiciona callback URL e JavaScript origin
- GitHub: Atualiza callback URL e homepage

---

### **5. Testar**

```bash
# Backend
curl https://seu-backend.railway.app/health

# Frontend
# Abre https://seu-frontend.vercel.app
# Testa registo/login
```

---

## 📝 **NOTAS IMPORTANTES**

1. **URLs temporários são OK** para primeiro deploy
2. **Atualiza depois** com URLs reais
3. **Re-deploy** pode ser necessário após atualizar variáveis
4. **OAuth** só funciona depois de atualizar URLs

---

**Seguindo esta ordem, tudo vai funcionar! 🚀**

