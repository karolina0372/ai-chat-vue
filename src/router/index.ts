import { createRouter, createWebHistory } from 'vue-router'
import { useChatStore } from '@/stores/chat'

const routes = [
  {
    path: '/chat/:id?',
    name: 'chat',
    component: () => import('@/views/ChatPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/chat',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.name !== 'chat') return

  const chatStore = useChatStore()
  const chatId = to.params.id as string

  if (!chatStore.chats.length) {
    const newId = chatStore.createNewChat()

    return `/chat/${newId}`
  }

  if (!chatStore.hasChat(chatId)) {
    return `/chat/${chatStore.firstChatId}`
  }
})

export default router
