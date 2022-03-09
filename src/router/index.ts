import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const history = createWebHashHistory()

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HemoPage',
    component: () => import('@/components/HomePage.vue')
  },
  {
    path: '/ReportContainer',
    name: 'ReportContainer',
    component: () => import('@/components/ReportContainer.vue')
  },
  {
    path: '/TableContainer',
    name: 'TableContainer',
    component: () => import('@/components/TableContainer.vue')
  },
  {
    path: '/EditCanvas',
    name: 'EditCanvas',
    component: () => import('@/components/editCanvasArea/EditCanvas.vue')
  }
]

const router = createRouter({
  history,
  routes
})

export default router;