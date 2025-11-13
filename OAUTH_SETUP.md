# 🔐 Guia de Configuração OAuth (Google e GitHub)

Este guia explica como configurar OAuth para permitir login com Google e GitHub.

---

## 📋 Pré-requisitos

- Conta Google
- Conta GitHub
- Backend rodando em `http://localhost:3001` (ou o teu URL de produção)

---

## 🌐 Google OAuth Setup

### Passo 1: Criar Projeto no Google Cloud Console

1. Acede a [Google Cloud Console](https://console.cloud.google.com/)
2. Clica em **"Select a project"** no topo
3. Clica em **"New Project"**
4. Dá um nome ao projeto (ex: "GreenTech OAuth")
5. Clica em **"Create"**

### Passo 2: Ativar Google+ API

1. No menu lateral, vai a **"APIs & Services"** → **"Library"**
2. Procura por **"Google+ API"** ou **"Google Identity"**
3. Clica em **"Enable"**

### Passo 3: Configurar OAuth Consent Screen

1. Vai a **"APIs & Services"** → **"OAuth consent screen"**
2. Escolhe **"External"** (ou Internal se tiveres Google Workspace)
3. Preenche:
   - **App name**: GreenTech Solutions
   - **User support email**: teu-email@gmail.com
   - **Developer contact**: teu-email@gmail.com
4. Clica em **"Save and Continue"**
5. Em **Scopes**, clica em **"Add or Remove Scopes"**
   - Seleciona: `.../auth/userinfo.email` e `.../auth/userinfo.profile`
6. Clica em **"Save and Continue"** (podes pular os passos seguintes)
7. Em **Test users**, adiciona o teu email (apenas para desenvolvimento)

### Passo 4: Criar OAuth 2.0 Client ID

1. Vai a **"APIs & Services"** → **"Credentials"**
2. Clica em **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. Escolhe **"Web application"**
4. Dá um nome (ex: "GreenTech Web Client")
5. Em **Authorized JavaScript origins**, adiciona:
   ```
   http://localhost:3001
   https://seu-backend.railway.app  (produção)
   ```
6. Em **Authorized redirect URIs**, adiciona:
   ```
   http://localhost:3001/api/auth/google/callback
   https://seu-backend.railway.app/api/auth/google/callback  (produção)
   ```
7. Clica em **"Create"**
8. **IMPORTANTE**: Copia o **Client ID** e **Client Secret** (aparecem numa janela popup)

### Passo 5: Adicionar ao Backend `.env`

No ficheiro `backend/.env`, adiciona:

```env
GOOGLE_CLIENT_ID=o-client-id-que-copiaste.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=o-client-secret-que-copiaste
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
```

**Para produção**, muda para:
```env
GOOGLE_CALLBACK_URL=https://seu-backend.railway.app/api/auth/google/callback
FRONTEND_URL=https://seu-frontend.vercel.app
```

---

## 🐙 GitHub OAuth Setup

### Passo 1: Criar OAuth App no GitHub

1. Acede a [GitHub Settings](https://github.com/settings/developers)
2. Clica em **"OAuth Apps"** no menu lateral
3. Clica em **"New OAuth App"** ou **"Register a new application"**

### Passo 2: Configurar OAuth App

Preenche o formulário:

- **Application name**: GreenTech Solutions
- **Homepage URL**: 
  - Desenvolvimento: `http://localhost:5173`
  - Produção: `https://seu-frontend.vercel.app`
- **Application description** (opcional): Plataforma de serviços tech
- **Authorization callback URL**: 
  - Desenvolvimento: `http://localhost:3001/api/auth/github/callback`
  - Produção: `https://seu-backend.railway.app/api/auth/github/callback`

### Passo 3: Obter Credenciais

1. Após criar, GitHub mostra a página da aplicação
2. Vais ver o **Client ID** (podes revelar/publicar)
3. Clica em **"Generate a new client secret"**
4. **IMPORTANTE**: Copia o **Client Secret** (só aparece uma vez!)

### Passo 4: Adicionar ao Backend `.env`

No ficheiro `backend/.env`, adiciona:

```env
GITHUB_CLIENT_ID=o-client-id-do-github
GITHUB_CLIENT_SECRET=o-client-secret-do-github
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/github/callback
```

**Para produção**, muda para:
```env
GITHUB_CALLBACK_URL=https://seu-backend.railway.app/api/auth/github/callback
```

---

## 🔧 Configuração Final

### Backend `.env` Completo

```env
# Server
PORT=3001
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/greentech?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=seu-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=seu-github-client-id
GITHUB_CLIENT_SECRET=seu-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/github/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Reiniciar Backend

Após adicionar as variáveis de ambiente:

```bash
cd backend
# Para o servidor (Ctrl+C)
npm run dev
```

---

## ✅ Testar OAuth

### Teste Local

1. **Inicia o backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Inicia o frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Testa o login**:
   - Abre `http://localhost:5173`
   - Clica em **"Entrar"**
   - Clica em **"Continuar com Google"** ou **"Continuar com GitHub"**
   - Deves ser redirecionado para o provider
   - Após autorizar, voltas ao site e fazes login automaticamente

### Problemas Comuns

**"redirect_uri_mismatch"**
- Verifica se o callback URL no `.env` corresponde ao configurado no provider
- Para Google: verifica em "Authorized redirect URIs"
- Para GitHub: verifica em "Authorization callback URL"

**"invalid_client"**
- Verifica se o Client ID e Secret estão corretos no `.env`
- Confirma que não há espaços extras antes/depois

**"access_denied"**
- O utilizador cancelou a autorização (normal)

**Não redireciona após login**
- Verifica se `FRONTEND_URL` está configurado corretamente
- Verifica os logs do backend para erros

---

## 🚀 Produção

### Google Cloud Console (Produção)

1. Vai às **Credentials** do teu projeto
2. Edita o **OAuth Client ID**
3. Adiciona os URLs de produção:
   - **Authorized JavaScript origins**: `https://seu-backend.railway.app`
   - **Authorized redirect URIs**: `https://seu-backend.railway.app/api/auth/google/callback`

### GitHub OAuth App (Produção)

1. Vai às **OAuth Apps** no GitHub
2. Edita a aplicação
3. Atualiza:
   - **Homepage URL**: `https://seu-frontend.vercel.app`
   - **Authorization callback URL**: `https://seu-backend.railway.app/api/auth/github/callback`

### Variáveis de Ambiente em Produção

No teu serviço de hosting (Railway/Render):

```env
GOOGLE_CLIENT_ID=seu-client-id
GOOGLE_CLIENT_SECRET=seu-client-secret
GOOGLE_CALLBACK_URL=https://seu-backend.railway.app/api/auth/google/callback
GITHUB_CLIENT_ID=seu-client-id
GITHUB_CLIENT_SECRET=seu-client-secret
GITHUB_CALLBACK_URL=https://seu-backend.railway.app/api/auth/github/callback
FRONTEND_URL=https://seu-frontend.vercel.app
```

---

## 📝 Notas Importantes

1. **Client Secrets são confidenciais**: Nunca os commits no Git!
2. **URLs de produção**: Certifica-te de atualizar todos os URLs quando fizeres deploy
3. **Test users no Google**: Em desenvolvimento, só utilizadores na lista de test users podem usar OAuth
4. **Rate limits**: GitHub e Google têm limites de rate - normalmente não é problema para uso normal

---

## 🆘 Suporte

Se tiveres problemas:
1. Verifica os logs do backend (`/tmp/backend.log`)
2. Verifica o console do browser (F12)
3. Confirma que todas as variáveis de ambiente estão configuradas
4. Confirma que os URLs estão corretos nos providers

---

**Boa sorte! 🚀**

