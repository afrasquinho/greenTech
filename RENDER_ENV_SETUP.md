# 🔐 Configurar Variáveis de Ambiente no Render

Guia passo a passo para adicionar variáveis de ambiente no Render.

---

## 📋 **VARIÁVEIS NECESSÁRIAS**

Adiciona estas variáveis **uma a uma** no Render:

1. `PORT`
2. `NODE_ENV`
3. `MONGODB_URI`
4. `JWT_SECRET`
5. `JWT_EXPIRES_IN`
6. `FRONTEND_URL`

---

## 🎯 **PASSO A PASSO**

### **1. Aceder a Environment Variables**

1. No Render Dashboard, vai ao teu serviço (Web Service)
2. No menu lateral, clica em **"Environment"**
3. Vais ver a secção "Environment Variables"

---

### **2. Adicionar Variável 1: PORT**

1. Clica no botão **"Add Environment Variable"** (ou "+")
2. No campo **NAME**: `PORT`
3. No campo **value**: `3001`
4. Clica "Save" ou "Add"

---

### **3. Adicionar Variável 2: NODE_ENV**

1. Clica **"Add Environment Variable"** novamente
2. **NAME**: `NODE_ENV`
3. **value**: `production`
4. Clica "Save"

---

### **4. Adicionar Variável 3: MONGODB_URI**

1. Clica **"Add Environment Variable"**
2. **NAME**: `MONGODB_URI`
3. **value**: `mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority`

**⚠️ IMPORTANTE**: 
- Substitui `user`, `password` e `cluster` pelos teus valores reais
- Se não tens ainda, vai a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) e cria

**Exemplo real:**
```
mongodb+srv://admin:MinhaSenha123@cluster0.abc123.mongodb.net/greentech?retryWrites=true&w=majority
```

4. Clica "Save"

---

### **5. Adicionar Variável 4: JWT_SECRET**

1. Clica **"Add Environment Variable"**
2. **NAME**: `JWT_SECRET`
3. **value**: Gera uma chave segura

**Como gerar:**
- **Opção 1**: No terminal:
  ```bash
  openssl rand -base64 32
  ```
- **Opção 2**: Usa o botão "Generate" no Render (se disponível)
- **Opção 3**: Usa um gerador online: [randomkeygen.com](https://randomkeygen.com)

**Exemplo:**
```
aB3xK9mP2qR7vT5wY8zA1bC4dE6fG9hI0jK2lM3nO4pQ5rS6tU7vW8xY9zA0
```

**⚠️ IMPORTANTE**: 
- Mínimo 32 caracteres
- Guarda esta chave em segurança!
- Não partilhes com ninguém

4. Clica "Save"

---

### **6. Adicionar Variável 5: JWT_EXPIRES_IN**

1. Clica **"Add Environment Variable"**
2. **NAME**: `JWT_EXPIRES_IN`
3. **value**: `7d`
4. Clica "Save"

---

### **7. Adicionar Variável 6: FRONTEND_URL**

1. Clica **"Add Environment Variable"**
2. **NAME**: `FRONTEND_URL`
3. **value**: `http://localhost:5173`

**⚠️ TEMPORÁRIO**: 
- Por agora usa `http://localhost:5173`
- Depois de fazer deploy do frontend, atualiza para o URL real (ex: `https://seu-projeto.vercel.app`)

4. Clica "Save"

---

## ✅ **VERIFICAR**

Depois de adicionar todas, deves ver 6 variáveis:

```
PORT = 3001
NODE_ENV = production
MONGODB_URI = mongodb+srv://...
JWT_SECRET = aB3xK9mP2qR7vT5wY8zA1bC4dE6fG9hI0jK2lM3nO4pQ5rS6tU7vW8xY9zA0
JWT_EXPIRES_IN = 7d
FRONTEND_URL = http://localhost:5173
```

---

## 🔄 **ATUALIZAR DEPOIS**

Depois de fazer deploy do frontend, volta aqui e atualiza:

1. Clica na variável `FRONTEND_URL`
2. Edita o valor para: `https://seu-projeto.vercel.app`
3. Clica "Save"
4. Render vai re-deploy automaticamente

---

## 🆘 **SE PRECISARES DE AJUDA**

### **Não tens MongoDB URI?**

1. Vai a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Cria conta (grátis)
3. Cria cluster (gratuito)
4. Database Access → Add User
5. Network Access → Add IP (0.0.0.0/0 para desenvolvimento)
6. Clusters → Connect → Connect your application
7. Copia a connection string
8. Substitui `<password>` pela password do utilizador

### **Não sabes gerar JWT_SECRET?**

**No terminal:**
```bash
openssl rand -base64 32
```

**Ou usa este (substitui por um único):**
```
greentech-super-secret-jwt-key-2024-production-min-32-chars
```

---

## 📝 **CHECKLIST**

- [ ] `PORT=3001` adicionado
- [ ] `NODE_ENV=production` adicionado
- [ ] `MONGODB_URI` adicionado (com connection string real)
- [ ] `JWT_SECRET` adicionado (mínimo 32 caracteres)
- [ ] `JWT_EXPIRES_IN=7d` adicionado
- [ ] `FRONTEND_URL=http://localhost:5173` adicionado
- [ ] Todas as variáveis visíveis na lista

---

**Depois de adicionar todas, podes fazer deploy! 🚀**

