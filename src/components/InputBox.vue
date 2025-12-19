<template>
  <v-form
    class="w-100 pb-3"
    @submit.prevent="onSendMessage"
  >
    <v-text-field
      v-model="message"
      :append-icon="chatStore.isTyping ? 'mdi-stop-circle-outline' : 'mdi-send'"
      clear-icon="mdi-close-circle"
      label="Message"
      type="text"
      variant="filled"
      color="primary"
      base-color="grey"
      clearable
      hide-details
      @click:append="onSendMessage"
      @click:append-inner="toggleMarker"
      @click:clear="clearMessage"
    ></v-text-field>
  </v-form>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useChatStore } from '@/stores/chat'

  const chatStore = useChatStore()

  const marker = ref(true)
  const message = ref('')

  const toggleMarker = () => {
    marker.value = !marker.value
  }

  const clearMessage = () => {
    message.value = ''
  }

  const onSendMessage = () => {
    chatStore.sendMessage(message.value)

    clearMessage()
  }
</script>