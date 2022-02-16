import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/common.scss'
import { initTheme } from './utils/theme'
import store from './store'
import 'ant-design-vue/dist/antd.less'
import './assets/iconfont/iconfont.css'

initTheme('default')

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
