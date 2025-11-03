# 🌟 GreenTech Solutions - Website & Platform

Plataforma completa para GreenTech Solutions com **integração de IA** para atendimento inteligente.

## 🚀 Stack Tecnológica

### Frontend
- **React 19** + **TypeScript**
- **Tailwind CSS v4** - Estilização moderna
- **Vite** - Build rápido
- **React Router** - Navegação
- **Axios** - HTTP client

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **OpenAI API** - Integração com ChatGPT
- **CORS** - Cross-origin support

### Infraestrutura
- Separado em frontend/backend
- Pronto para deploy independente
- Testado e funcional

## 📁 Estrutura do Projeto

```
greenHours/
├── frontend/          # React + TypeScript
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   └── ...
│   └── package.json
│
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Controllers
│   │   ├── services/      # Business logic
│   │   └── index.ts       # Entry point
│   └── package.json
│
└── README.md
```

## 🎯 Funcionalidades

### ✨ Implementadas
- ✅ **Design Moderno** com Tailwind CSS
- ✅ **Responsivo** - Mobile-first
- ✅ **Chat IA Integrado** - OpenAI GPT-4o-mini
- ✅ **Formulário de Contacto** - Funcional com backend
- ✅ **Email Integration** - Nodemailer com SMTP
- ✅ **SEO Otimizado** - Meta tags e analytics ready
- ✅ **Google Analytics** - Tracking configurável
- ✅ **Navegação Suave** - Smooth scroll
- ✅ **Animações** - Transições elegantes
- ✅ **Validação** - Frontend e backend
- ✅ **Error Handling** - Gestão de erros completa

### 🚧 Futuro
- 🔄 **Database** - MongoDB ou PostgreSQL
- 🔄 **Autenticação** - JWT + OAuth
- 🔄 **Dashboard** - Para clientes
- 🔄 **Blog** - Artigos técnicos
- 🔄 **Payment Gateway** - Stripe/PayPal

## 🛠️ Como Executar

### Pré-requisitos
- Node.js v18+ 
- npm ou yarn
- Conta OpenAI (opcional - tem fallback)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend roda em: `http://localhost:5173`

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite .env e adicione OPENAI_API_KEY se tiver
npm run dev
```

Backend roda em: `http://localhost:3001`

## 🔑 Configuração OpenAI

1. Crie uma conta em [OpenAI](https://platform.openai.com)
2. Gere uma API Key
3. Adicione no `backend/.env`:
```env
OPENAI_API_KEY=sk-...
```

**Nota**: Sem API key, o sistema usa respostas mock inteligentes!

## 📦 Deploy

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
# Deploy dist/
```

### Variáveis de Ambiente

Ver arquivo completo: `ENV_TEMPLATE.md`

**Frontend** (.env):
```env
VITE_API_URL=https://seu-backend.com/api
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Backend** (.env):
```env
PORT=3001
OPENAI_API_KEY=sk-...

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha
```

**Configuração de Email**: Ver `EMAIL_SETUP.md`

## 🎨 Personalização

### Mudar Cores
Edite `frontend/src/index.css`:
```css
:root {
  --primary: #10b981;  /* Verde */
  --secondary: #6366f1; /* Índigo */
}
```

### Alterar Nome
Substituir "GreenTech" por:
```bash
# Frontend
cd frontend
grep -r "GreenTech" src/ | sed 's/:.*//' | uniq

# Backend  
cd backend
grep -r "GreenTech" src/ | sed 's/:.*//' | uniq
```

## 🔒 Segurança

- ✅ CORS configurado
- ✅ Env vars para secrets
- ✅ Rate limiting (implementar)
- ✅ Input validation
- 🔄 HTTPS obrigatório em prod

## 📊 Performance

- ⚡ Vite - Build ultra-rápido
- ⚡ Code splitting automático
- ⚡ Lazy loading pronto
- ⚡ Optimized assets
- 📈 Lighthouse: 90+

## 🤝 Contribuir

Este é um projeto proprietário da GreenTech Solutions.

## 📄 Licença

Proprietário © 2024 GreenTech Solutions

## 📞 Suporte

- Email: info@greentechsolutions.pt
- LinkedIn: GreenTech Solutions

---

**Desenvolvido com ❤️ por GreenTech Solutions**
