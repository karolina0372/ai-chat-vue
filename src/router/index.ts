import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/chat/:id?',
    name: 'chat',
    component: () => import('@/views/ChatPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
