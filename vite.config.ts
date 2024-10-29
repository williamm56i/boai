import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://172.17.0.4:8080/boai/', // 你的後端 API 服務地址
        changeOrigin: true, // 避免後端 API 拒絕因為不同來源的請求
      }
    }
  }
})
