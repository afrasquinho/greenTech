#!/bin/bash

# Script rápido para atualizar variáveis de ambiente para produção
# Uso: ./QUICK_FIX_ENV.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Atualizar Variáveis de Ambiente para Produção${NC}\n"

# Verificar se .env existe
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}❌ backend/.env não encontrado${NC}"
    echo -e "${YELLOW}   Cria primeiro: cp backend/.env.example backend/.env${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  ATENÇÃO: Este script vai atualizar o teu backend/.env${NC}"
echo -e "${YELLOW}   Certifica-te de ter backup ou estar num branch de teste${NC}\n"

read -p "Continuar? (s/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "Cancelado."
    exit 0
fi

# Pedir URLs
echo -e "\n${BLUE}📝 Preciso dos URLs de produção:${NC}\n"

read -p "Frontend URL (ex: https://seu-app.vercel.app): " FRONTEND_URL
read -p "Backend URL (ex: https://seu-backend.railway.app): " BACKEND_URL

if [ -z "$FRONTEND_URL" ] || [ -z "$BACKEND_URL" ]; then
    echo -e "${RED}❌ URLs são obrigatórias${NC}"
    exit 1
fi

# Remover trailing slash se existir
FRONTEND_URL=${FRONTEND_URL%/}
BACKEND_URL=${BACKEND_URL%/}

echo -e "\n${BLUE}🔄 Atualizando backend/.env...${NC}"

# Backup
cp backend/.env backend/.env.backup.$(date +%Y%m%d_%H%M%S)
echo -e "${GREEN}✅ Backup criado${NC}"

# Atualizar NODE_ENV
if grep -q "^NODE_ENV=" backend/.env; then
    sed -i 's/^NODE_ENV=.*/NODE_ENV=production/' backend/.env
else
    echo "NODE_ENV=production" >> backend/.env
fi
echo -e "${GREEN}✅ NODE_ENV=production${NC}"

# Atualizar FRONTEND_URL
if grep -q "^FRONTEND_URL=" backend/.env; then
    sed -i "s|^FRONTEND_URL=.*|FRONTEND_URL=$FRONTEND_URL|" backend/.env
else
    echo "FRONTEND_URL=$FRONTEND_URL" >> backend/.env
fi
echo -e "${GREEN}✅ FRONTEND_URL=$FRONTEND_URL${NC}"

# Atualizar GOOGLE_CALLBACK_URL
GOOGLE_CALLBACK="$BACKEND_URL/api/auth/google/callback"
if grep -q "^GOOGLE_CALLBACK_URL=" backend/.env; then
    sed -i "s|^GOOGLE_CALLBACK_URL=.*|GOOGLE_CALLBACK_URL=$GOOGLE_CALLBACK|" backend/.env
else
    echo "GOOGLE_CALLBACK_URL=$GOOGLE_CALLBACK" >> backend/.env
fi
echo -e "${GREEN}✅ GOOGLE_CALLBACK_URL=$GOOGLE_CALLBACK${NC}"

# Atualizar GITHUB_CALLBACK_URL
GITHUB_CALLBACK="$BACKEND_URL/api/auth/github/callback"
if grep -q "^GITHUB_CALLBACK_URL=" backend/.env; then
    sed -i "s|^GITHUB_CALLBACK_URL=.*|GITHUB_CALLBACK_URL=$GITHUB_CALLBACK|" backend/.env
else
    echo "GITHUB_CALLBACK_URL=$GITHUB_CALLBACK" >> backend/.env
fi
echo -e "${GREEN}✅ GITHUB_CALLBACK_URL=$GITHUB_CALLBACK${NC}"

echo -e "\n${GREEN}✅ Variáveis atualizadas!${NC}\n"

echo -e "${YELLOW}📋 Próximos passos:${NC}"
echo -e "1. Verifica: ${BLUE}node check-production-env.js${NC}"
echo -e "2. Configura estas mesmas variáveis no Railway (backend)"
echo -e "3. Configura ${BLUE}VITE_API_URL=$BACKEND_URL/api${NC} no Vercel (frontend)"
echo -e "4. Atualiza OAuth providers com os novos URLs\n"

echo -e "${BLUE}💡 Dica: Consulta FIX_PRODUCTION_ENV.md para instruções detalhadas${NC}\n"

