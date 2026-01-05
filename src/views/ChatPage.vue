<template>
  <v-layout class="rounded rounded-md border">
    <Header />

    <SideBar />

    <v-main class="d-flex align-center justify-center h-screen">
      <MessageList />
    </v-main>

    <v-footer name="footer" app>
      <InputBox />
    </v-footer>
  </v-layout>
</template>

<script setup lang="ts">
  import { onMounted, watch } from 'vue'
  import MessageList from '@/components/MessageList.vue'
  import Header from '@/components/Header.vue'
  import SideBar from '@/components/SideBar.vue'
  import InputBox from '@/components/InputBox.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useChatStore } from '@/stores/chat'

  const chatStore = useChatStore()
  const route = useRoute()
  const router = useRouter()

  onMounted(() => {
    chatStore.init(route.params.id as string | undefined)

    if (!chatStore.hasChat(route.params.id as string)) {
      router.replace(`/chat/${chatStore.firstChatId}`)
    }
  })

  watch(
    () => route.params.id,
    (id) => {
      if (typeof id === 'string') {
        chatStore.setActiveChat(id)
      }
    },
    { immediate: true }
  )
</script>
