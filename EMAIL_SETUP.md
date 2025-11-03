# 📧 Configuração de Email - GreenTech Solutions

## ✅ Email já está implementado!

O formulário de contacto está pronto. Agora só precisa configurar o SMTP.

---

## 🎯 Opções de Configuração

### Opção 1: Gmail (Mais Fácil)

1. **Criar App Password**:
   - Vá em: https://myaccount.google.com/apppasswords
   - Selecione "Mail" e seu dispositivo
   - Copie a senha gerada

2. **Configurar backend/.env**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=seu-email@gmail.com
   SMTP_PASS=senha-app-aqui
   ```

✅ Pronto! Emails enviados!

---

### Opção 2: SendGrid (Recomendado para Produção)

1. **Criar conta**: https://sendgrid.com (Grátis: 100 emails/dia)

2. **API Key**:
   - Settings → API Keys → Create
   - Copie a key

3. **Configurar backend/.env**:
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=sua-api-key-aqui
   ```

---

### Opção 3: Resend (Moderno e Rápido)

1. **Criar conta**: https://resend.com (Grátis: 3,000 emails/mês)

2. **API Key**: Dashboard → API Keys

3. **Modificar backend** para usar Resend (ou enviar via API REST)

---

### Opção 4: Outros Provedores

#### Outlook/Hotmail
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=seu-email@outlook.com
SMTP_PASS=sua-senha
```

#### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=seu-email@yahoo.com
SMTP_PASS=sua-senha
```

---

## 🧪 Testar

### Backend funcionando?
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@exemplo.com",
    "service": "software",
    "message": "Olá!"
  }'
```

### Ver logs:
```bash
cd backend && npm run dev
# Veja: "✅ Email sent" ou "📧 Email would be sent"
```

---

## 🔒 Sem SMTP Configurado?

**Não se preocupe!** 

O sistema funciona sem SMTP:
- ✅ Formulário aceita mensagens
- ✅ Valida inputs
- ✅ Exibe confirmação
- 📝 **Email fica logado no console** (para desenvolvimento)

---

## 🎯 Deploy

**Produção**: Use SendGrid, Mailgun ou Resend
**Desenvolvimento**: Console logs ou Gmail

---

## 🐛 Problemas?

**"Authentication failed"**
- Verifique SMTP_USER e SMTP_PASS
- Gmail: Use App Password, não senha normal

**"Connection timeout"**
- Firewall bloqueando?
- ISP bloqueia SMTP?
- Tente SMTP_PORT=465 com secure=true

**"550 Rejected"**
- Email de destino inválido
- Domínio bloqueado

---

## 📊 Monitoring

- **SendGrid**: Dashboard com analytics
- **Gmail**: Sent items folder
- **Logs**: `npm run dev` no backend

---

**Configuração completa! 🎉**

