<template>
  <v-list nav>
    <v-btn text="New Chat" block color="primary" class="mb-2" @click="chatStore.createNewChat"></v-btn>
    <v-btn text="New Private Chat" block color="grey" @click="chatStore.createPrivateChat"></v-btn>
    <v-list-item
      v-for="chat in chatStore.chats"
      :key="chat.id"
      :title="chat.title"
      link
      :class="{'v-list-item--active': chatStore.activeChatId === chat.id}"
      @click="chatStore.setActiveChat(chat.id)"
    ></v-list-item>
  </v-list>
</template>

<script setup lang="ts">
  import { useChatStore } from '@/stores/chat'

  const chatStore = useChatStore()
</script>
