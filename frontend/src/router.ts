import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/clients',
  },
  {
    path: '/clients',
    component: () => import('@/ui/pages/Clients.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
