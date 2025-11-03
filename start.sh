#!/bin/bash

echo "🚀 Starting GreenTech Solutions Platform..."
echo ""

# Check if .env exists in backend
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env from example..."
    cp backend/.env.example backend/.env 2>/dev/null || echo "PORT=3001" > backend/.env
fi

echo "⚙️  Starting Backend..."
cd backend && npm run dev &
BACKEND_PID=$!

echo "⏳ Waiting for backend to start..."
sleep 3

echo "⚛️  Starting Frontend..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Platform starting!"
echo "🔗 Frontend: http://localhost:5173"
echo "🔗 Backend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all services"

wait

