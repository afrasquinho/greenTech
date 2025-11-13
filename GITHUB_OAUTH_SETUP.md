# 🔧 Configurar OAuth GitHub - Passo a Passo

O erro do GitHub OAuth geralmente acontece porque as variáveis de ambiente não estão configuradas no Render.

---

## ❌ **PROBLEMA**

O Passport não encontra a estratégia "github" porque:
- `GITHUB_CLIENT_ID` não está configurado, OU
- `GITHUB_CLIENT_SECRET` não está configurado, OU
- Ambos estão vazios ou com valores inválidos

---

## ✅ **SOLUÇÃO: Configurar OAuth GitHub**

### **PASSO 1: Criar OAuth App no GitHub**

1. **Vai a [GitHub Developer Settings](https://github.com/settings/developers)**
2. **Clica em "OAuth Apps"** → **"New OAuth App"**
3. **Preenche o formulário:**
   - **Application name**: `GreenTech Solutions` (ou o nome que quiseres)
   - **Homepage URL**: `https://green-tech-gamma.vercel.app` (ou o teu frontend URL)
   - **Authorization callback URL**: `https://greentech-49d3.onrender.com/api/auth/github/callback`
     - ⚠️ **Substitui pelo teu URL real do Render!**
4. **Clica "Register application"**

5. **Copia as credenciais:**
   - **Client ID**: Copia (aparece na página)
   - **Client Secret**: Clica "Generate a new client secret" e copia
     - ⚠️ **IMPORTANTE**: Copia imediatamente, só aparece uma vez!

---

### **PASSO 2: Adicionar Variáveis no Render**

1. **No Render Dashboard:**
   - Vai ao teu serviço
   - **Environment** → Adiciona variáveis

2. **Adiciona estas 3 variáveis:**

   **Variável 1:**
   - Name: `GITHUB_CLIENT_ID`
   - Value: (o Client ID que copiaste)

   **Variável 2:**
   - Name: `GITHUB_CLIENT_SECRET`
   - Value: (o Client Secret que copiaste)

   **Variável 3:**
   - Name: `GITHUB_CALLBACK_URL`
   - Value: `https://greentech-49d3.onrender.com/api/auth/github/callback`
     - ⚠️ **Substitui pelo teu URL real do Render!**

3. **Clica "Save" em cada uma**

---

### **PASSO 3: Re-deploy**

1. **Render vai fazer rebuild automaticamente** após adicionar variáveis
2. **Ou faz manual**: Deployments → Latest → Redeploy
3. **Aguarda 2-5 minutos**

---

### **PASSO 4: Verificar**

1. **Verifica logs no Render:**
   - Deves ver: `✅ GitHub OAuth strategy configured`
   - Se vires: `⚠️  GitHub OAuth not configured` → Variáveis não estão corretas

2. **Testa:**
   - Abre o frontend
   - Clica "Login com GitHub"
   - Deve funcionar agora!

---

## 🐛 **SE AINDA NÃO FUNCIONAR**

### **Verificar Variáveis:**

1. **No Render, verifica:**
   - `GITHUB_CLIENT_ID` não está vazio?
   - `GITHUB_CLIENT_SECRET` não está vazio?
   - `GITHUB_CALLBACK_URL` está correto?

2. **Verifica logs:**
   - Render → Logs
   - Procura por "GitHub OAuth"
   - Vês "strategy configured" ou "not configured"?

### **Erros Comuns:**

**"redirect_uri_mismatch"**
- Verifica se o callback URL no GitHub é **exatamente igual** ao do Render
- Deve ser: `https://greentech-49d3.onrender.com/api/auth/github/callback`

**"invalid_client"**
- Verifica se copiaste corretamente Client ID e Secret
- Verifica se não há espaços extras

---

## ✅ **CHECKLIST**

- [ ] OAuth app criado no GitHub
- [ ] Client ID copiado
- [ ] Client Secret copiado
- [ ] Callback URL configurado no GitHub: `https://greentech-49d3.onrender.com/api/auth/github/callback`
- [ ] `GITHUB_CLIENT_ID` adicionado no Render
- [ ] `GITHUB_CLIENT_SECRET` adicionado no Render
- [ ] `GITHUB_CALLBACK_URL` adicionado no Render
- [ ] Rebuild feito
- [ ] Logs mostram "✅ GitHub OAuth strategy configured"
- [ ] Testado e funciona!

---

## 🎯 **RESUMO RÁPIDO**

1. **GitHub** → Settings → Developer settings → OAuth Apps → New OAuth App
2. **Configura callback URL**: `https://greentech-49d3.onrender.com/api/auth/github/callback`
3. **Copia Client ID e Secret**
4. **Render** → Adiciona 3 variáveis (CLIENT_ID, CLIENT_SECRET, CALLBACK_URL)
5. **Aguarda rebuild**
6. **Testa**

---

**Depois de configurar, o OAuth GitHub vai funcionar! 🚀**

