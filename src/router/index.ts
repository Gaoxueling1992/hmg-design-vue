import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const history = createWebHashHistory()

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@comps/HomePage.vue'),
    children: [
      {
        path: '',
        component: () => import('@comps/Report.vue')
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('@comps/Table.vue')
      },
      {
        path: '/report',
        name: 'report',
        component: () => import('@comps/Report.vue')
      },
      {
        path: '/form',
        name: 'form',
        component: () => import('@comps/Form.vue')
      },
      // {
      //   path: '/components',
      //   name: 'components',
      //   component: () => import('@comps/Components.vue')
      // }
    ]
  }
]

const router = createRouter({
  history,
  routes
})

export default router;