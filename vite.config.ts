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
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/Index.ts'),
      name: 'reseditor2',
      fileName: (format) => `reseditor2.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 umd 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
