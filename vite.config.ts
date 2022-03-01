import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor'
const path = require('path')

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    themePreprocessorPlugin({
      less: {
        // 各个主题文件的位置
        multipleScopeVars: [
          {
            scopeName: 'theme-default',
            path: resolve('./src/style/theme/default.less'),
          },
          {
            scopeName: "theme-green",
            path: resolve('./src/style/theme/green.less'),
          },
        ],
      },
    })
  ],
  base: './',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: '@comps',
        replacement: resolve(__dirname, 'src/components')
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    open: true,
    port: 5001,
    host: '0.0.0.0'
  }
})
