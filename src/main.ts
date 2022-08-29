/*
 * @Author: sunny gaoxl@hmgsoft.com
 * @Date: 2022-03-02 18:08:41
 * @LastEditors: sunny gaoxl@hmgsoft.com
 * @LastEditTime: 2022-08-29 15:49:08
 * @FilePath: /hmg-design-vue/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/common.scss'
import { initTheme } from './utils/theme'
import store from './store'
import 'ant-design-vue/dist/antd.less'
import './assets/iconfont/iconfont.scss'

initTheme('green')

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#vite-app')
