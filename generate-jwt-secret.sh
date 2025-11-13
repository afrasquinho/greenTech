#!/bin/bash

# Script para gerar JWT_SECRET seguro
# Uso: ./generate-jwt-secret.sh

echo "🔐 Gerando JWT_SECRET seguro..."

# Tenta usar openssl
if command -v openssl &> /dev/null; then
    SECRET=$(openssl rand -base64 32)
    echo ""
    echo "✅ JWT_SECRET gerado:"
    echo ""
    echo "$SECRET"
    echo ""
    echo "📋 Copia este valor e cola no Render (Environment Variables → JWT_SECRET)"
    echo ""
else
    echo "❌ openssl não encontrado"
    echo ""
    echo "💡 Alternativas:"
    echo "1. Instala openssl: sudo apt install openssl (Linux) ou brew install openssl (Mac)"
    echo "2. Usa um gerador online: https://randomkeygen.com"
    echo "3. Usa este (substitui por um único):"
    echo ""
    echo "greentech-$(date +%s)-$(whoami)-$(hostname)-secret-key-2024"
    echo ""
fi

