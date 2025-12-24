@echo off
chcp 65001 >nul
setlocal

:: Switch to script directory (Support chinese path)
cd /d "%~dp0"

title Concept Art Prompt Generator Launcher

echo ==========================================
echo    Concept Art Prompt Generator
echo ==========================================
echo.

:: 1. Check Node.js
echo [Step 1/3] Checking Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not installed!
    echo Please download and install from: https://nodejs.org/
    echo.
    pause
    exit /b
)

:: Detect npm command
set NPM_CMD=npm
where npm.cmd >nul 2>nul
if %errorlevel% equ 0 (
    set NPM_CMD=npm.cmd
)

:: 2. Check node_modules
echo [Step 2/3] Checking dependencies...
set MISSING_DEPS=0
if not exist "node_modules" set MISSING_DEPS=1
if exist "node_modules" (
    :: Check if vite actually exists
    if not exist "node_modules\vite\bin\vite.js" set MISSING_DEPS=1
)

if %MISSING_DEPS%==1 (
    echo.
    echo [INFO] Dependencies are missing or incomplete.
    echo [INFO] Installing dependencies...
    echo [INFO] This may take a few minutes...
    echo.
    
    call %NPM_CMD% install
    
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Installation failed.
        echo Please check your network connection.
        echo.
        pause
        exit /b
    )
    echo [SUCCESS] Dependencies installed.
) else (
    echo [INFO] Dependencies found.
)

:: 3. Start Server
echo.
echo [Step 3/3] Starting server...
echo.
echo [INFO] The browser should open automatically.
echo [INFO] If not, please access the URL shown below manually.
echo.
echo -------------------------------------------------------
echo.

:: Run vite directly from node_modules using node to ensure it works
node node_modules\vite\bin\vite.js --host --open

echo.
echo -------------------------------------------------------
echo [INFO] Server stopped.
pause
