import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from '@/views/ChatPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/chat/1'
  },
  {
    path: '/chat/:id',
    component: ChatPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
