import { ref, computed, watch } from 'vue' 
import { defineStore } from 'pinia' 
import type { Chat } from '@/stores/types'
import router from '@/router'
import { sendToAI, generateChatTitle } from '@/services/ai' 

const STORAGE_KEY = 'ai-chat-data'

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([])
  const activeChatId = ref<string | null>(null)
  const isTyping = ref(false)
  const theme = ref('light')
  
  const messageList = computed(() => { 
    return chats.value.find(chat => chat.id === activeChatId.value)?.messages ?? []
  })
  
  const activeChat = computed(() => {
    return chats.value.find(c => c.id === activeChatId.value)
  })

  const hasChat = (id: string | undefined): boolean => {
    if (!id) return false

    return chats.value.some(c => c.id === id)
  }

  const firstChatId = computed(() => {
    return chats.value[0]?.id ?? ''
  })
  
  const init = (chatIdFromRoute?: string) => {
    initChatStorage()

    if (chatIdFromRoute) {
      const exists = chats.value.find(c => c.id === chatIdFromRoute)
      
      if (exists) {
        activeChatId.value = chatIdFromRoute
      }
    }
    
    if (!chats.value.length) { 
      createNewChat() 
    } 
  } 
  
  const initChatStorage = () => { 
    const raw = localStorage.getItem(STORAGE_KEY) 
    
    if (raw) { 
      try { 
        const data = JSON.parse(raw)

        chats.value = data.chats ?? [] 
        activeChatId.value = data.chats[0]?.id ?? null
        theme.value = data.theme 
      } catch { 
        chats.value = [] 
        activeChatId.value = null
        theme.value = 'light' 
      } 
    }
  }

  const saveChatItems = () => {
    localStorage.setItem(
        STORAGE_KEY, 
        JSON.stringify({ 
          chats: chats.value.filter(chat => chat.isPrivate === false && chat.messages.length > 0), 
          activeChatId: activeChatId.value, 
          theme: theme.value, 
        }) 
    ) 
  } 
        
  const sendMessage = async (message: string): Promise<void> => { 
    if (!activeChat.value) return 
    if(!message.length) return
    if (isTyping.value) return

    const isFirstMessage = activeChat.value.messages.length === 0

    if (isFirstMessage && activeChat.value.title === 'New chat') {
      try {
        activeChat.value.title = await generateChatTitle(message)
        saveChatItems()
      } catch {
        activeChat.value.title = message.slice(0, 30)
      }
    }
    
    activeChat.value.messages.push({ 
      content: message, 
      role: 'user' 
    })

    saveChatItems()

    await sendMessageToAI() 
  }
        
  const sendMessageToAI = async (): Promise<void> => { 
    if (!activeChat.value) return 
    
    isTyping.value = true 

    try { 
      const messages = activeChat.value.messages.map(msg => ({ 
        content: msg.content, 
        role: msg.role, 
      })) 
      
      const reply = await sendToAI(messages) 

      activeChat.value.messages.push({ 
        content: reply.content, 
        role: reply.role, 
      }) 
    } 
    catch (e) {
      let text = '⚠️ Something went wrong'

      if (e instanceof Error) {
        const err = e as Error & { status?: number }

        if (err.status === 401) text = '🔐 Invalid API key'
        if (err.status === 429) text = '⏳ Too many requests'
        if (err.status && err.status >= 500) text = '🤖 AI service unavailable'
      }

      activeChat.value.messages.push({
        role: 'assistant',
        content: text,
      })
    } 
    finally { 
      isTyping.value = false 
      saveChatItems() 
    } 
  } 
          
  const createNewChat = () => {
    if (isTyping.value) return 

    const id = crypto.randomUUID()

    const newChat = { 
      id, 
      title: 'New chat',
      messages: [], 
      isPrivate: false,
    } 
    
    chats.value.push(newChat)

    setActiveChat(newChat.id)
  } 
  
  const setActiveChat = (id: string) => {
    if (isTyping.value) return 

    activeChatId.value = id 
    router.replace(`/chat/${id}`)
  
    saveChatItems() 
  } 

  const createPrivateChat = () => {
    if (isTyping.value) return 

    const id = crypto.randomUUID()

    const newChat = { 
      id, 
      title: 'New chat',
      messages: [],
      isPrivate: true,
    } 
    
    chats.value.push(newChat)

    setActiveChat(newChat.id)
  }
  
  watch( () => theme.value, () => { 
      saveChatItems() 
    },
  )

  return { 
    chats, 
    init, 
    setActiveChat, 
    createNewChat, 
    sendMessage, 
    activeChat, 
    activeChatId, 
    messageList, 
    isTyping, 
    theme, 
    createPrivateChat,
    hasChat,
    firstChatId,
  } 
})