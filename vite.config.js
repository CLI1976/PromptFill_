import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 防止 Vite 默认清除控制台，方便调试
  clearScreen: false,
  // 让 Tauri 能够监听特定的端口
  server: {
    port: 1420,
    strictPort: true,
    host: true, // 保持原本的 --host 功能
  },
  // 设置环境变量的前缀，这样在 Tauri 中可以访问它们
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // 只有在 Tauri 构建时才应用特殊的 target
    target: process.env.TAURI_PLATFORM 
      ? (process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13')
      : 'modules', // 网页版使用标准的现代化模块 target
    // 在非调试构建中不缩小代码，方便报错定位（可选）
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // 为调试构建生成源代码映射
    sourcemap: !!process.env.TAURI_DEBUG,
  },
})

