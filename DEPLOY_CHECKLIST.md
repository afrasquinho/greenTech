# ✅ Checklist de Deploy

Use este checklist para garantir que tudo está pronto para produção.

---

## 📋 **Pré-Deploy**

### Código
- [ ] Código testado localmente
- [ ] Sem erros de linting
- [ ] Sem erros TypeScript
- [ ] Build funciona (`npm run build` em ambos)
- [ ] Testes passam (se existirem)

### Configuração
- [ ] `backend/.env` configurado (não commitado)
- [ ] `frontend/.env.local` configurado (não commitado)
- [ ] Variáveis de ambiente documentadas
- [ ] Secrets não estão no código
- [ ] `.gitignore` verificado

### Base de Dados
- [ ] MongoDB Atlas configurado
- [ ] Connection string testada
- [ ] IP whitelist configurado
- [ ] Backup configurado (recomendado)

### Segurança
- [ ] `JWT_SECRET` forte (mínimo 32 caracteres)
- [ ] Secrets nunca commitados
- [ ] CORS configurado corretamente
- [ ] Rate limiting implementado (recomendado)

---

## 🎨 **Deploy Frontend**

### Preparação
- [ ] Build testado localmente
- [ ] `dist/` folder criado
- [ ] Tamanho do build verificado

### Vercel/Netlify
- [ ] Conta criada
- [ ] Projeto criado
- [ ] Repositório conectado
- [ ] Build command configurado
- [ ] Output directory configurado
- [ ] Variáveis de ambiente configuradas:
  - [ ] `VITE_API_URL`
  - [ ] `VITE_GA_MEASUREMENT_ID` (opcional)
  - [ ] `VITE_STRIPE_PUBLISHABLE_KEY` (se usar)

### Testes
- [ ] Site acessível
- [ ] HTTPS ativo
- [ ] Página carrega corretamente
- [ ] Sem erros no console

---

## ⚙️ **Deploy Backend**

### Preparação
- [ ] Build testado localmente
- [ ] `dist/` folder criado
- [ ] Dependências verificadas

### Railway/Render
- [ ] Conta criada
- [ ] Projeto criado
- [ ] Repositório conectado
- [ ] Root directory: `backend`
- [ ] Build command configurado
- [ ] Start command configurado
- [ ] Port configurado

### Variáveis de Ambiente
- [ ] `PORT`
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI`
- [ ] `JWT_SECRET`
- [ ] `JWT_EXPIRES_IN`
- [ ] `FRONTEND_URL`
- [ ] `OPENAI_API_KEY` (se usar)
- [ ] `STRIPE_SECRET_KEY` (se usar)
- [ ] `STRIPE_WEBHOOK_SECRET` (se usar)
- [ ] `GOOGLE_CLIENT_ID` (se usar)
- [ ] `GOOGLE_CLIENT_SECRET` (se usar)
- [ ] `GOOGLE_CALLBACK_URL`
- [ ] `GITHUB_CLIENT_ID` (se usar)
- [ ] `GITHUB_CLIENT_SECRET` (se usar)
- [ ] `GITHUB_CALLBACK_URL`
- [ ] `SMTP_HOST` (se usar)
- [ ] `SMTP_PORT` (se usar)
- [ ] `SMTP_USER` (se usar)
- [ ] `SMTP_PASS` (se usar)

### Testes
- [ ] Backend inicia sem erros
- [ ] Health check funciona: `/health`
- [ ] MongoDB conectado
- [ ] Logs sem erros críticos

---

## 🔗 **Integração**

### URLs
- [ ] Frontend URL atualizado no backend (`FRONTEND_URL`)
- [ ] Backend URL atualizado no frontend (`VITE_API_URL`)
- [ ] OAuth callbacks atualizados

### CORS
- [ ] CORS configurado no backend
- [ ] Apenas domínios permitidos
- [ ] Credentials configurados

### Testes de Integração
- [ ] Frontend conecta ao backend
- [ ] Registo funciona
- [ ] Login funciona
- [ ] OAuth funciona (se configurado)
- [ ] API calls funcionam
- [ ] Sem erros CORS

---

## 🔐 **Segurança**

### Produção
- [ ] `NODE_ENV=production`
- [ ] HTTPS ativo (automático)
- [ ] Secrets em variáveis de ambiente
- [ ] CORS restrito
- [ ] Rate limiting (recomendado)

### MongoDB
- [ ] IP whitelist configurado
- [ ] Utilizador com permissões mínimas
- [ ] Connection string segura

### Stripe (se usar)
- [ ] Webhook configurado
- [ ] Webhook secret configurado
- [ ] Testado em modo test primeiro

---

## 📊 **Monitoramento**

### Health Checks
- [ ] Endpoint `/health` funcionando
- [ ] Monitoramento configurado (UptimeRobot, etc.)

### Logs
- [ ] Logs acessíveis
- [ ] Erros sendo registados
- [ ] Logs não expõem secrets

### Analytics
- [ ] Google Analytics configurado (se usar)
- [ ] Tracking funcionando

---

## 🧪 **Testes Finais**

### Funcionalidades
- [ ] Registo de utilizador
- [ ] Login
- [ ] Dashboard carrega
- [ ] Criar projeto
- [ ] Ver projetos
- [ ] Criar artigo (admin)
- [ ] Ver blog
- [ ] Formulário de contacto
- [ ] Chat IA (se configurado)
- [ ] Pagamentos (se configurado)

### Performance
- [ ] Página carrega rápido
- [ ] API responde rápido
- [ ] Sem erros no console
- [ ] Imagens carregam

### Mobile
- [ ] Responsivo funciona
- [ ] Touch funciona
- [ ] Menu mobile funciona

---

## 📝 **Documentação**

- [ ] README atualizado
- [ ] URLs de produção documentadas
- [ ] Variáveis de ambiente documentadas
- [ ] Processo de deploy documentado

---

## 🎉 **Pós-Deploy**

- [ ] Domínio customizado configurado (se necessário)
- [ ] SSL/HTTPS verificado
- [ ] Backup configurado
- [ ] Equipa notificada
- [ ] Monitoramento ativo

---

## 🐛 **Se algo falhar**

1. Verifica logs no Railway/Vercel
2. Verifica variáveis de ambiente
3. Verifica se build funciona localmente
4. Verifica CORS e URLs
5. Consulta `DEPLOY_COMPLETE.md` para troubleshooting

---

**Deploy bem-sucedido! 🚀**

