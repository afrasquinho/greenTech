# 📝 Como Adicionar Variáveis de Ambiente no Render

Guia visual passo a passo para adicionar variáveis de ambiente no Render.

---

## 🎯 **PASSO 1: Aceder a Environment Variables**

1. **No Render Dashboard:**
   - Vai ao teu projeto (Web Service)
   - No menu lateral esquerdo, procura **"Environment"**
   - Clica em **"Environment"**

2. **Vais ver:**
   - Título: "Environment Variables"
   - Texto explicativo
   - Uma secção para adicionar variáveis

---

## 🎯 **PASSO 2: Adicionar Primeira Variável**

### **Método 1: Botão "Add Environment Variable"**

1. **Procura o botão:**
   - Deve ter um ícone de "+" (mais)
   - Texto: "Add Environment Variable"
   - Clica neste botão

2. **Aparecem 2 campos:**
   - Campo da esquerda: **NAME** (nome da variável)
   - Campo da direita: **value** (valor da variável)

3. **Preenche:**
   - **NAME**: `PORT`
   - **value**: `3001`

4. **Clica "Save"** ou "Add" (botão que aparece)

---

### **Método 2: Se não vês o botão**

1. Procura por uma linha vazia com campos
2. Preenche diretamente:
   - Campo esquerdo: `PORT`
   - Campo direito: `3001`
3. A variável é salva automaticamente ou clica "Save"

---

## 🎯 **PASSO 3: Adicionar Restantes Variáveis**

Repete o processo para cada variável:

### **Variável 2: NODE_ENV**

1. Clica **"Add Environment Variable"** novamente (ou "+")
2. **NAME**: `NODE_ENV`
3. **value**: `production`
4. Clica "Save"

---

### **Variável 3: MONGODB_URI**

1. Clica **"Add Environment Variable"**
2. **NAME**: `MONGODB_URI`
3. **value**: `mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority`
   - **⚠️ Substitui pelos teus valores reais!**
4. Clica "Save"

**💡 Dica**: Se o valor for muito longo, o campo pode expandir. Podes escrever normalmente.

---

### **Variável 4: JWT_SECRET**

1. Clica **"Add Environment Variable"**
2. **NAME**: `JWT_SECRET`
3. **value**: `rj/1ZXfOzkhIP7Y6Oxd3Sbsh/t3dJRVKEM5EH9SsQbA=`
   - (Ou gera outro com: `./generate-jwt-secret.sh`)
4. Clica "Save"

---

### **Variável 5: JWT_EXPIRES_IN**

1. Clica **"Add Environment Variable"**
2. **NAME**: `JWT_EXPIRES_IN`
3. **value**: `7d`
4. Clica "Save"

---

### **Variável 6: FRONTEND_URL**

1. Clica **"Add Environment Variable"**
2. **NAME**: `FRONTEND_URL`
3. **value**: `http://localhost:5173`
4. Clica "Save"

---

## ✅ **VERIFICAR SE ESTÁ CORRETO**

Depois de adicionar todas, deves ver uma lista com 6 variáveis:

```
PORT = 3001
NODE_ENV = production
MONGODB_URI = mongodb+srv://...
JWT_SECRET = rj/1ZXfOzkhIP7Y6Oxd3Sbsh/t3dJRVKEM5EH9SsQbA=
JWT_EXPIRES_IN = 7d
FRONTEND_URL = http://localhost:5173
```

---

## 🔧 **EDITAR VARIÁVEL EXISTENTE**

Se precisares de editar:

1. Clica na variável que queres editar
2. Altera o valor
3. Clica "Save"

---

## 🗑️ **ELIMINAR VARIÁVEL**

Se precisares de eliminar:

1. Procura o ícone de lixo/trash (🗑️) ao lado da variável
2. Clica no ícone
3. Confirma a eliminação

---

## 📋 **RESUMO RÁPIDO**

**Para cada variável:**

1. Clica **"Add Environment Variable"** (ou "+")
2. Preenche **NAME** (nome)
3. Preenche **value** (valor)
4. Clica **"Save"**

**Repete 6 vezes** (uma para cada variável)

---

## 🆘 **SE NÃO CONSEGUES ENCONTRAR**

### **Não vês "Environment"?**

1. Certifica-te que estás no serviço correto (Web Service)
2. No menu lateral, procura por:
   - "Environment"
   - "Environment Variables"
   - "Env"
   - "Config"
   - "Settings" → depois "Environment"

### **Não vês botão "Add"?**

1. Pode estar no topo da página
2. Pode estar no final da lista
3. Pode ser um ícone "+" apenas
4. Pode estar em "Advanced" → "Environment Variables"

---

## 💡 **DICA**

**Ordem recomendada de adicionar:**

1. `PORT` (mais simples)
2. `NODE_ENV` (mais simples)
3. `JWT_EXPIRES_IN` (mais simples)
4. `FRONTEND_URL` (mais simples)
5. `JWT_SECRET` (precisa gerar)
6. `MONGODB_URI` (mais complexo, precisa de connection string)

---

## ✅ **CHECKLIST**

- [ ] Encontrei a secção "Environment Variables"
- [ ] Adicionei `PORT=3001`
- [ ] Adicionei `NODE_ENV=production`
- [ ] Adicionei `MONGODB_URI=...` (com connection string real)
- [ ] Adicionei `JWT_SECRET=...` (mínimo 32 caracteres)
- [ ] Adicionei `JWT_EXPIRES_IN=7d`
- [ ] Adicionei `FRONTEND_URL=http://localhost:5173`
- [ ] Vejo todas as 6 variáveis na lista

---

**Depois de adicionar todas, o Render vai fazer deploy automaticamente! 🚀**

