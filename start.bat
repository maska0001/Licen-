@echo off
REM Quick start script for Event Management Platform
REM This script starts both backend and frontend servers

echo ========================================
echo Event Management Platform - Quick Start
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting Backend Server...
echo.
start "Backend Server" cmd /k "cd backend && python run.py"

REM Wait for backend to start
echo Waiting for backend to start (10 seconds)...
timeout /t 10 /nobreak >nul

echo.
echo Starting Frontend Server...
echo.
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Servers Starting...
echo ========================================
echo.
echo Backend: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo Frontend: http://localhost:5173
echo.
echo Check the terminal windows for any errors.
echo.
echo Press any key to exit this window...
pause >nul
