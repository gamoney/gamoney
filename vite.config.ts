import reactPlugin from '@vitejs/plugin-react'
import { UserConfig } from 'vite'

export default {
  build: {
    outDir: '../dist'
  },
  plugins: [reactPlugin()],
  root: './src'
} as UserConfig
