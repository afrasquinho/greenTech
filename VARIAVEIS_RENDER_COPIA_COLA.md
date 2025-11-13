# 📋 Variáveis de Ambiente - Copia e Cola

Copia cada variável e cola no Render.

---

## 🎯 **COMO USAR**

1. No Render, vai a **Environment** → **Environment Variables**
2. Clica **"Add Environment Variable"**
3. Copia o **NAME** e cola no campo esquerdo
4. Copia o **value** e cola no campo direito
5. Clica "Save"
6. Repete para cada variável

---

## 📝 **VARIÁVEIS PARA COPIAR**

### **1. PORT**

**NAME:**
```
PORT
```

**value:**
```
3001
```

---

### **2. NODE_ENV**

**NAME:**
```
NODE_ENV
```

**value:**
```
production
```

---

### **3. MONGODB_URI**

**NAME:**
```
MONGODB_URI
```

**value:**
```
mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority
```

**⚠️ IMPORTANTE**: Substitui `user`, `password` e `cluster` pelos teus valores reais do MongoDB Atlas!

**Exemplo real:**
```
mongodb+srv://admin:MinhaSenha123@cluster0.abc123.mongodb.net/greentech?retryWrites=true&w=majority
```

---

### **4. JWT_SECRET**

**NAME:**
```
JWT_SECRET
```

**value:**
```
rj/1ZXfOzkhIP7Y6Oxd3Sbsh/t3dJRVKEM5EH9SsQbA=
```

**💡 Dica**: Se quiseres gerar outro, executa:
```bash
./generate-jwt-secret.sh
```

---

### **5. JWT_EXPIRES_IN**

**NAME:**
```
JWT_EXPIRES_IN
```

**value:**
```
7d
```

---

### **6. FRONTEND_URL**

**NAME:**
```
FRONTEND_URL
```

**value:**
```
http://localhost:5173
```

**⚠️ TEMPORÁRIO**: Depois de fazer deploy do frontend, atualiza para o URL real (ex: `https://seu-projeto.vercel.app`)

---

## ✅ **VERIFICAÇÃO FINAL**

Depois de adicionar todas, deves ter 6 variáveis:

```
✅ PORT = 3001
✅ NODE_ENV = production
✅ MONGODB_URI = mongodb+srv://...
✅ JWT_SECRET = rj/1ZXfOzkhIP7Y6Oxd3Sbsh/t3dJRVKEM5EH9SsQbA=
✅ JWT_EXPIRES_IN = 7d
✅ FRONTEND_URL = http://localhost:5173
```

---

## 🚀 **PRÓXIMO PASSO**

Depois de adicionar todas as variáveis:
1. Render vai fazer deploy automaticamente
2. Aguarda alguns minutos
3. Verifica se o deploy foi bem-sucedido
4. Testa: `curl https://seu-backend.onrender.com/health`

---

**Boa sorte! 🎉**

