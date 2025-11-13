# 🗺️ Guia do Menu do Render

Onde encontrar cada coisa no Render Dashboard.

---

## 📍 **ESTRUTURA DO MENU**

Quando clicas no teu serviço (Web Service), vais ver um menu lateral com:

### **Opções Comuns:**

1. **Overview** ou **Dashboard**
   - Visão geral do serviço
   - Status, logs recentes

2. **Logs**
   - Logs em tempo real
   - Histórico de logs

3. **Metrics**
   - CPU, memória, etc.

4. **Environment** ⭐ **AQUI ESTÁ!**
   - Variáveis de ambiente
   - É aqui que editas `FRONTEND_URL`

5. **Settings**
   - Configurações gerais
   - Pode ter submenu "Environment"

6. **Deployments**
   - Histórico de deploys

---

## 🎯 **PASSO A PASSO VISUAL**

### **1. Render Dashboard Principal**

```
┌─────────────────────────────────┐
│  Render Dashboard               │
│                                  │
│  [New +]                         │
│                                  │
│  Your Services:                  │
│  ┌───────────────────────────┐  │
│  │ greentech-backend         │  │ ← CLICA AQUI
│  │ https://greentech-49d3...  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### **2. Página do Serviço**

Depois de clicar, vais ver:

```
┌─────────────────────────────────┐
│  greentech-backend             │
│  https://greentech-49d3...      │
│                                 │
│  ┌─────────┐ ┌─────────┐       │
│  │ Logs    │ │ Metrics │       │
│  └─────────┘ └─────────┘       │
│                                 │
│  Menu Lateral:                  │
│  ┌──────────────────────────┐  │
│  │ Overview                  │  │
│  │ Logs                      │  │
│  │ Metrics                   │  │
│  │ Environment  ⭐ AQUI!     │  │ ← CLICA AQUI
│  │ Settings                  │  │
│  │ Deployments               │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

### **3. Página Environment**

Depois de clicar em "Environment":

```
┌─────────────────────────────────┐
│  Environment Variables          │
│                                 │
│  Set environment-specific...   │
│                                 │
│  ┌─────────────┬─────────────┐  │
│  │ NAME        │ VALUE       │  │
│  ├─────────────┼─────────────┤  │
│  │ PORT        │ 3001        │  │
│  │ NODE_ENV    │ production  │  │
│  │ MONGODB_URI │ mongodb+... │  │
│  │ JWT_SECRET  │ ...         │  │
│  │ JWT_EXPIRES │ 7d          │  │
│  │ FRONTEND... │ localhost   │  │ ← EDITA ESTE
│  └─────────────┴─────────────┘  │
│                                 │
│  [Add Environment Variable]     │
└─────────────────────────────────┘
```

---

## 🔍 **SE NÃO VES "ENVIRONMENT"**

### **Tenta Settings:**

1. Clica em **"Settings"**
2. Dentro de Settings, procura:
   - "Environment Variables"
   - "Environment"
   - "Env"
   - "Config"

### **Ou procura por tabs no topo:**

Algumas versões do Render têm tabs no topo:
- Overview | Logs | Metrics | **Environment** | Settings

---

## ✏️ **EDITAR VARIÁVEL**

Quando encontrares `FRONTEND_URL`:

1. **Clica na linha** da variável
2. **Ou clica no ícone de editar** (lápis ✏️ ou três pontos ⋮)
3. **Edita o valor**
4. **Clica "Save"** ou "Update"

---

## 📱 **VERSÃO MOBILE**

No mobile, o menu pode estar:
- No topo (hamburger menu ☰)
- No bottom
- Em "More" ou "..."

---

## 🆘 **AINDA NÃO ENCONTRAS?**

**Diz-me:**
1. Que opções vês no menu lateral?
2. Que tabs vês no topo da página?
3. Tira um screenshot (se possível)

**Ou tenta:**
- URL direto: `https://dashboard.render.com/web/[teu-servico-id]/environment`
- (Substitui `[teu-servico-id]` pelo ID do teu serviço)

---

**Vamos encontrar juntos! 🔍**

