# 🔧 Como Atualizar Variáveis no Render

Guia passo a passo para encontrar e atualizar variáveis de ambiente no Render.

---

## 🎯 **ONDE ESTÁ?**

### **Opção 1: Menu Lateral (Mais Fácil)**

1. **No Render Dashboard:**
   - Vais ver o teu serviço (Web Service) - `greentech-backend` ou similar
   - Clica no **nome do serviço** (não no URL, mas no nome)

2. **Menu Lateral Esquerdo:**
   - Procura por **"Environment"** ou **"Env"**
   - Clica em **"Environment"**

3. **Vais ver:**
   - Título: "Environment Variables"
   - Lista de variáveis que já adicionaste
   - Botão "Add Environment Variable"

---

### **Opção 2: Settings**

1. **No teu serviço:**
   - Clica no nome do serviço
   - No menu lateral, procura **"Settings"**
   - Clica em **"Settings"**

2. **Dentro de Settings:**
   - Procura por **"Environment"** ou **"Environment Variables"**
   - Clica

---

### **Opção 3: Se não vês "Environment"**

1. **No topo da página do serviço:**
   - Pode haver tabs: "Logs", "Metrics", "Settings", "Environment"
   - Clica em **"Environment"**

2. **Ou no menu dropdown:**
   - Pode haver um menu "..." (três pontos)
   - Clica e procura "Environment" ou "Variables"

---

## ✏️ **COMO EDITAR FRONTEND_URL**

### **Método 1: Editar Variável Existente**

1. **Vai a Environment** (como explicado acima)
2. **Encontra `FRONTEND_URL`** na lista
3. **Clica na variável** ou no ícone de editar (lápis ✏️)
4. **Edita o valor:**
   - Campo atual: `http://localhost:5173`
   - Muda para: `https://seu-frontend.vercel.app`
   - (Substitui pelo URL real do Vercel!)
5. **Clica "Save"** ou "Update"

---

### **Método 2: Se não existe, adicionar**

1. **Vai a Environment**
2. **Clica "Add Environment Variable"** (ou botão "+")
3. **Preenche:**
   - **Name**: `FRONTEND_URL`
   - **Value**: `https://seu-frontend.vercel.app`
4. **Clica "Save"**

---

## 📍 **CAMINHO COMPLETO**

```
Render Dashboard
  └─ Teu Serviço (greentech-backend)
      └─ Menu Lateral
          └─ Environment  ← CLICA AQUI
              └─ Environment Variables
                  └─ FRONTEND_URL  ← EDITA AQUI
```

---

## 🔍 **SE AINDA NÃO ENCONTRAS**

### **Tenta isto:**

1. **No Render Dashboard:**
   - Vai ao teu serviço
   - Clica no **nome** (não no URL)

2. **Procura por estas palavras:**
   - "Environment"
   - "Env"
   - "Variables"
   - "Config"
   - "Settings" → depois "Environment"

3. **Ou usa a busca:**
   - Pressiona `Ctrl+F` (ou `Cmd+F` no Mac)
   - Procura por "Environment" ou "FRONTEND_URL"

---

## 📸 **O QUE DEVES VER**

Quando encontrares, deves ver algo assim:

```
Environment Variables
─────────────────────
PORT = 3001
NODE_ENV = production
MONGODB_URI = mongodb+srv://...
JWT_SECRET = ...
JWT_EXPIRES_IN = 7d
FRONTEND_URL = http://localhost:5173  ← EDITA ESTE
```

---

## ✅ **DEPOIS DE EDITAR**

1. **Render vai re-deploy automaticamente** (ou pode pedir confirmação)
2. **Aguarda alguns minutos**
3. **Testa:**
   ```bash
   curl https://greentech-49d3.onrender.com/health
   ```

---

## 🆘 **AINDA NÃO ENCONTRAS?**

**Partilha:**
- O que vês no menu lateral do teu serviço?
- Que opções aparecem quando clicas no serviço?

**Ou tenta:**
- Clica em qualquer lugar do serviço
- Procura por "Variables" ou "Env" em qualquer menu
- Verifica se há um botão "Edit" ou "Configure"

---

**Diz-me o que vês e ajudo-te a encontrar! 🔍**

