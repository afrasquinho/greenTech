# 🍃 Configuração MongoDB - GreenTech Solutions

## ✅ MongoDB já está integrado!

O backend está pronto para conectar ao MongoDB. Só precisa da connection string.

---

## 🎯 Opção 1: MongoDB Atlas (Recomendado - Grátis)

### 1. Criar Conta
1. Aceda: https://www.mongodb.com/cloud/atlas
2. Crie conta grátis (M0 - 512MB grátis)

### 2. Criar Cluster
1. Clique em **"Create a Cluster"**
2. Escolha **"FREE"** (M0 Sandbox)
3. Escolha região (ex: AWS Frankfurt)
4. Clique em **"Create Cluster"** (demora 3-5 min)

### 3. Criar Utilizador de Base de Dados
1. Vá em **"Database Access"** (lado esquerdo)
2. Clique em **"Add New Database User"**
3. Escolha **"Password"** authentication
4. Crie username e password (GUARDE BEM!)
5. Permissões: **"Atlas admin"** ou **"Read and write to any database"**
6. Clique em **"Add User"**

### 4. Configurar Network Access
1. Vá em **"Network Access"** (lado esquerdo)
2. Clique em **"Add IP Address"**
3. Para desenvolvimento: Clique em **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Para produção: Adicione IPs específicos do seu servidor
5. Clique em **"Confirm"**

### 5. Obter Connection String
1. Vá em **"Database"** (lado esquerdo)
2. Clique em **"Connect"** no seu cluster
3. Escolha **"Connect your application"**
4. Driver: **"Node.js"**, Version: **"5.5 or later"**
5. Copie a connection string (exemplo):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Substitua `<password>` pela sua senha
7. Adicione nome da database: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/greentech?retryWrites=true&w=majority`

### 6. Configurar Backend
Adicione no `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/greentech?retryWrites=true&w=majority
```

✅ Pronto! MongoDB conectado!

---

## 🎯 Opção 2: MongoDB Local (Desenvolvimento)

### Instalar MongoDB Localmente
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS (Homebrew)
brew install mongodb-community

# Iniciar MongoDB
mongod
```

### Connection String Local
```env
MONGODB_URI=mongodb://localhost:27017/greentech
```

---

## 🧪 Testar Conexão

### 1. Iniciar Backend
```bash
cd backend
npm run dev
```

### 2. Ver Logs
Se conectou com sucesso, verás:
```
✅ MongoDB connected successfully
```

Se houver erro:
```
❌ MongoDB connection error: ...
```

### 3. Enviar Formulário de Contacto
1. Vá ao site: http://localhost:5173
2. Preencha formulário de contacto
3. Veja logs no backend:
   ```
   ✅ Contact saved to database: 507f1f77bcf86cd799439011
   ```

---

## 📊 Verificar Dados no MongoDB Atlas

1. Vá em **"Database"** → Clique em **"Browse Collections"**
2. Deve ver database `greentech`
3. Collection `contacts` com os formulários enviados

---

## 🔒 Segurança

### Em Produção:
1. ✅ Use IP whitelist (não 0.0.0.0/0)
2. ✅ Use senha forte
3. ✅ Habilite MFA (Multi-Factor Authentication)
4. ✅ Use connection string em env vars (nunca no código)

---

## 🐛 Problemas Comuns

### "Authentication failed"
- Verifique username e password na connection string
- Confirme que user tem permissões corretas

### "Connection timeout"
- Verifique Network Access (IP whitelist)
- Teste com "Allow from anywhere" temporariamente

### "MongoServerError: bad auth"
- Verifique se substituiu `<password>` na connection string
- Verifique caracteres especiais na senha (URL encode se necessário)

### "MONGODB_URI not configured"
- Adicione `MONGODB_URI` no `.env`
- Reinicie o backend

---

## 📚 Próximos Passos

Com MongoDB configurado, pode:
- ✅ Guardar formulários de contacto
- ✅ Guardar utilizadores (próximo passo: autenticação)
- ✅ Guardar projetos/portfolio
- ✅ Guardar artigos de blog

---

**MongoDB configurado! 🎉**
