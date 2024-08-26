import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/IndexHome.vue')
    },
    {
      path: '/HomeWork1',
      name: 'HomeWork1',
      component: () => import('../views/HomeWork1.vue')
    },
    {
      path: '/HomeWork2',
      name: 'HomeWork2',
      component: () => import('../views/HomeWork2.vue')
    },
    {
      path: '/HomeWork3',
      name: 'HomeWork3',
      component: () => import('../views/HomeWork3.vue')
    }
  ]
})

export default router
