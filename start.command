#!/bin/zsh -l

# ^ 使用 -l (login) 模式，强制加载用户的 .zshrc / .bash_profile 等配置

# 切换到脚本所在的目录
cd "$(dirname "$0")"

echo "=========================================="
echo "   正在启动 Concept Art Prompt Generator   "
echo "=========================================="

# 尝试手动加载 nvm (如果存在)
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
fi

# 检查 npm 是否可用
if ! command -v npm &> /dev/null; then
    echo "❌ 严重错误: 仍然无法找到 'npm' 命令。"
    echo ""
    echo "-----------------------------------------------------"
    echo "【排查指南】"
    echo "1. 请确认您是否已安装 Node.js？"
    echo "   - 如果没有安装，请访问官网下载安装： https://nodejs.org/"
    echo "   - 推荐下载 'LTS' (长期支持) 版本。"
    echo ""
    echo "2. 如果您确定已经安装 (例如在终端能运行 node -v)："
    echo "   - 请尝试直接打开终端，拖入此文件夹，然后输入："
    echo "     cd \"$(pwd)\" && npm install && npm run dev:open"
    echo "-----------------------------------------------------"
    
    # 保持窗口打开
    read -k 1 -s "?按任意键退出..."
    exit 1
fi

echo "✅ 环境检查通过: Using Node $(node -v)"

# 修复 npm 缓存权限问题（如果存在）
if [ -d "$HOME/.npm" ]; then
    if [ ! -w "$HOME/.npm/_cacache" ] 2>/dev/null; then
        echo "🔧 检测到 npm 缓存权限问题，正在修复..."
        sudo chown -R $(id -u):$(id -g) "$HOME/.npm" 2>/dev/null || true
    fi
fi

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖 (首次运行可能需要几分钟)..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败。"
        echo "💡 尝试清理缓存后重新安装..."
        rm -rf node_modules package-lock.json
        npm cache clean --force 2>/dev/null || true
        npm install
        if [ $? -ne 0 ]; then
            echo "❌ 依赖安装仍然失败。请检查网络或手动运行: npm install"
            read -k 1 -s "?按任意键退出..."
            exit 1
        fi
    fi
fi

# 修复可执行文件权限 (防止 Permission denied)
# 某些情况下解压或传输文件会导致执行权限丢失
if [ -d "node_modules/.bin" ]; then
    chmod +x node_modules/.bin/* 2>/dev/null || true
fi
if [ -f "node_modules/vite/bin/vite.js" ]; then
    chmod +x "node_modules/vite/bin/vite.js" 2>/dev/null || true
fi

echo "🚀 正在启动服务..."
echo "------------------------------------------"
echo "🌐 服务启动后将自动打开浏览器..."
echo "📌 如果没有自动打开，请手动访问: http://localhost:5173"
echo "💡 提示: 关闭此窗口将停止服务"
echo "------------------------------------------"

# 直接使用 node 启动 vite.js，与 Windows 保持一致的稳健性
# 这样可以避免 npm run 可能遇到的路径问题
node node_modules/vite/bin/vite.js --host --open

# 如果服务异常退出
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 服务似乎意外停止了。"
    echo "💡 建议：尝试在终端手动运行 'npm install' 修复依赖"
    read -k 1 -s "?按任意键退出..."
fi
