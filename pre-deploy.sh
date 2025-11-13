#!/bin/bash

# Script de verificação pré-deploy
# Uso: ./pre-deploy.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔍 Verificando pré-requisitos para deploy...${NC}\n"

# Verificar se estamos no diretório correto
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Erro: Executa este script na raiz do projeto${NC}"
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm não encontrado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm: $(npm --version)${NC}"

# Verificar se .env existe (backend)
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env não encontrado${NC}"
    echo -e "${YELLOW}   Cria: cp backend/.env.example backend/.env${NC}"
else
    echo -e "${GREEN}✅ backend/.env existe${NC}"
fi

# Verificar se .env.local existe (frontend)
if [ ! -f "frontend/.env.local" ]; then
    echo -e "${YELLOW}⚠️  frontend/.env.local não encontrado${NC}"
    echo -e "${YELLOW}   Cria: cp frontend/.env.example frontend/.env.local${NC}"
else
    echo -e "${GREEN}✅ frontend/.env.local existe${NC}"
fi

# Verificar dependências backend
echo -e "\n${GREEN}📦 Verificando dependências backend...${NC}"
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências backend...${NC}"
    cd backend && npm install && cd ..
else
    echo -e "${GREEN}✅ Dependências backend instaladas${NC}"
fi

# Verificar dependências frontend
echo -e "\n${GREEN}📦 Verificando dependências frontend...${NC}"
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências frontend...${NC}"
    cd frontend && npm install && cd ..
else
    echo -e "${GREEN}✅ Dependências frontend instaladas${NC}"
fi

# Build backend
echo -e "\n${GREEN}🔨 Testando build backend...${NC}"
cd backend
if npm run build; then
    echo -e "${GREEN}✅ Build backend OK${NC}"
else
    echo -e "${RED}❌ Build backend falhou${NC}"
    exit 1
fi
cd ..

# Build frontend
echo -e "\n${GREEN}🔨 Testando build frontend...${NC}"
cd frontend
if npm run build; then
    echo -e "${GREEN}✅ Build frontend OK${NC}"
    echo -e "${GREEN}✅ Pasta dist/ criada${NC}"
else
    echo -e "${RED}❌ Build frontend falhou${NC}"
    exit 1
fi
cd ..

# Verificar tamanho do build
BACKEND_SIZE=$(du -sh backend/dist 2>/dev/null | cut -f1 || echo "N/A")
FRONTEND_SIZE=$(du -sh frontend/dist 2>/dev/null | cut -f1 || echo "N/A")

echo -e "\n${GREEN}📊 Tamanho dos builds:${NC}"
echo -e "   Backend: ${BACKEND_SIZE}"
echo -e "   Frontend: ${FRONTEND_SIZE}"

# Verificar se há secrets no código
echo -e "\n${GREEN}🔐 Verificando secrets no código...${NC}"
if grep -r "sk_live\|sk_proj\|mongodb+srv://.*password" --include="*.ts" --include="*.js" --include="*.tsx" --include="*.jsx" backend/src frontend/src 2>/dev/null | grep -v ".env" | grep -v "node_modules"; then
    echo -e "${RED}❌ Possíveis secrets encontrados no código!${NC}"
    echo -e "${YELLOW}   Verifica antes de fazer commit${NC}"
else
    echo -e "${GREEN}✅ Nenhum secret encontrado no código${NC}"
fi

# Resumo
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Verificação pré-deploy concluída!${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "${GREEN}Próximos passos:${NC}"
echo -e "1. Verifica as variáveis de ambiente em produção"
echo -e "2. Faz push para GitHub"
echo -e "3. Deploy no Vercel/Railway"
echo -e "4. Testa a aplicação em produção\n"

