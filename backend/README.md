# Backend - GreenTech Solutions

Node.js + Express + TypeScript + OpenAI

## 🚀 Quick Start

```bash
npm install
cp .env.example .env
# Editar .env com OpenAI API key
npm run dev
```

## 📦 Build

```bash
npm run build
npm start
```

## 🔧 Scripts

- `npm run dev` - Desenvolvimento com nodemon
- `npm run build` - Compilar TypeScript
- `npm start` - Production mode

## 🔑 Configuração

Editar `.env`:
```env
PORT=3001
OPENAI_API_KEY=sk-...
```

## 📡 API Endpoints

- `GET /` - Health check
- `GET /health` - Status
- `POST /api/chat` - Chat com IA

### Exemplo Chat
```json
POST /api/chat
{
  "message": "O que vocês fazem?"
}
```

## 🔒 Segurança

- CORS configurado
- Input validation
- Environment variables
- Error handling

