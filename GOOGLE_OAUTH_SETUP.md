# 🔐 Guia Passo a Passo - Obter Google Client Secret

Este guia mostra exatamente como obter o **Google Client Secret** para configurar OAuth.

---

## 📋 Pré-requisitos

- Conta Google (Gmail)
- Acesso ao Google Cloud Console
- Google Client ID já configurado: `SEU_GOOGLE_CLIENT_ID.apps.googleusercontent.com`

---

## 🚀 Passos Detalhados

### Passo 1: Aceder ao Google Cloud Console

1. Abre o browser e vai a: **https://console.cloud.google.com/**
2. Se não estiveres logado, faz login com a tua conta Google
3. Certifica-te de que estás no projeto correto (verifica no topo)

### Passo 2: Navegar para Credentials (Credenciais)

1. No menu lateral esquerdo, procura por **"APIs & Services"** (APIs e Serviços)
2. Clica em **"APIs & Services"**
3. No submenu que aparece, clica em **"Credentials"** (Credenciais)

   **Ou directamente:**
   - Vai a: https://console.cloud.google.com/apis/credentials

### Passo 3: Encontrar o teu OAuth Client ID

1. Na página de Credentials, vais ver uma lista de credenciais
2. Procura pelo teu **OAuth 2.0 Client ID**:
   - Nome: geralmente "Web client" ou o nome que deste
   - Tipo: OAuth 2.0 Client ID
   - Client ID começa com: `SEU_GOOGLE_CLIENT_ID-...`

### Passo 4: Ver o Client Secret

1. **Clica no nome** do teu OAuth Client ID (não no ícone, mas no nome)
2. Isto abre a página de detalhes do Client ID
3. Aqui vais ver:
   - **Client ID**: `SEU_GOOGLE_CLIENT_ID.apps.googleusercontent.com` ✅ (substitui pelo teu)
   - **Client secret**: aqui aparece o secret ou um botão para ver/revelar

### Passo 5: Obter o Client Secret

**Opção A - Se já existe:**
1. Ao lado de "Client secret", pode aparecer um ícone de olho 👁️ ou "Show" (Mostrar)
2. Clica para revelar o secret
3. Copia o valor completo

**Opção B - Se não existe ou foi removido:**
1. Se não vires o secret ou aparecer "Not shown" (Não mostrado), podes criar um novo:
2. Clica em **"Reset secret"** (Repor secret) ou **"Generate new secret"** (Gerar novo secret)
3. Confirma a ação
4. **IMPORTANTE**: Copia o secret imediatamente - só aparece uma vez!

---

## 📝 Como o Secret se parece

O Google Client Secret normalmente tem este formato:
```
GOCSPX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Ou pode ser:
```
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3456
```

**Exemplo real:**
```
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45pqr678
```

---

## ✅ Adicionar ao `.env`

Depois de copiares o Client Secret:

1. Abre o ficheiro `backend/.env`
2. Encontra a linha:
   ```env
   GOOGLE_CLIENT_SECRET=CONFIGURAR_GOOGLE_CLIENT_SECRET
   ```
3. Substitui `CONFIGURAR_GOOGLE_CLIENT_SECRET` pelo secret que copiaste:
   ```env
   GOOGLE_CLIENT_SECRET=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45pqr678
   ```
4. **Não** adiciones aspas ou espaços extras
5. Salva o ficheiro

---

## 🔍 Verificar URLs de Callback

Enquanto estás na página do OAuth Client ID, verifica se os **Authorized redirect URIs** estão corretos:

1. Desce até à secção **"Authorized redirect URIs"**
2. Deves ter:
   ```
   http://localhost:3001/api/auth/google/callback
   ```
3. Se não tiveres, **adiciona**:
   - Clica em **"ADD URI"** (Adicionar URI)
   - Cola: `http://localhost:3001/api/auth/google/callback`
   - Clica em **"ADD"** (Adicionar)
4. Clica em **"SAVE"** (Guardar) no final da página

---

## 🔄 Reiniciar o Backend

Depois de adicionares o Client Secret ao `.env`:

1. O nodemon deve detectar a mudança e reiniciar automaticamente
2. Ou para o servidor (Ctrl+C) e reinicia:
   ```bash
   cd backend
   npm run dev
   ```
3. Deves ver no terminal:
   ```
   ✅ Google OAuth strategy configured
   ```

---

## 🧪 Testar OAuth

1. Abre `http://localhost:5173`
2. Clica em **"Entrar"**
3. Clica em **"Continuar com Google"**
4. Deves ser redirecionado para o Google para autorizar
5. Após autorizar, voltas ao site e fazes login automaticamente

---

## ⚠️ Problemas Comuns

### "redirect_uri_mismatch"
- Verifica se o callback URL no `.env` corresponde ao configurado no Google
- Verifica se adicionaste o URI em "Authorized redirect URIs"

### "invalid_client"
- Verifica se o Client Secret está correto (sem espaços)
- Verifica se copiaste o secret completo

### "access_denied"
- O utilizador cancelou a autorização (normal)
- Certifica-te de que o email está nos "Test users" (em desenvolvimento)

### Secret não aparece
- Se o secret foi perdido, clica em "Reset secret" para gerar um novo
- **Nota**: O secret antigo deixa de funcionar!

---

## 🔒 Segurança

- **NUNCA** commits o `.env` no Git
- **NUNCA** partilhes o Client Secret publicamente
- **MANTÉM** o secret em local seguro
- Se suspeitares que foi comprometido, **RESETA** imediatamente

---

## 📞 Precisa de Ajuda?

Se ainda tiveres problemas:
1. Verifica se estás no projeto correto no Google Cloud Console
2. Verifica se o OAuth consent screen está configurado
3. Verifica os logs do backend para erros específicos

---

**Boa sorte! 🚀**

