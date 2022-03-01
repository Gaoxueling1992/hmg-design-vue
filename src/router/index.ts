import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const history = createWebHashHistory()

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/demo/HomePage.vue')
  }
]

const router = createRouter({
  history,
  routes
})

export default router;