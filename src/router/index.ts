import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const history = createWebHashHistory()

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@comps/HomePage.vue')
  }
]

const router = createRouter({
  history,
  routes
})

export default router;