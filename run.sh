#!/bin/bash

# Start Backend
echo "Starting Backend..."
cd backend
./.venv/bin/python3 manage.py runserver &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "Bancarotta Evitata is running!"
echo "Backend: http://127.0.0.1:8000"
echo "Frontend: http://localhost:5173"

# Handle closing
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

wait
