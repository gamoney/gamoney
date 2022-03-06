import reactPlugin from '@vitejs/plugin-react'
import { UserConfig } from 'vite'

export default {
  build: {
    emptyOutDir: true,
    outDir: '../dist'
  },
  plugins: [
    reactPlugin({
      babel: {
        plugins: [
          'babel-plugin-macros',
          [
            '@emotion/babel-plugin-jsx-pragmatic',
            {
              export: 'jsx',
              import: '__cssprop',
              module: '@emotion/react'
            }
          ],
          [
            '@babel/plugin-transform-react-jsx',
            { pragma: '__cssprop' },
            'twin.macro'
          ]
        ]
      }
    })
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils'
    }
  },
  root: './src'
} as UserConfig
