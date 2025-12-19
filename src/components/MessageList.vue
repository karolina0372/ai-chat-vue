<template>
  <v-container class="fill-height pa-0">
    <v-sheet
      class="chat"
      rounded="lg"
      width="100%"
    >
      <div ref="container" class="messages">
        <transition-group
          name="message"
          tag="div"
        >
          <div
            v-for="(message, index) in chatStore.messageList"
            :key="`message${index}`"
            class="message"
            :class="`message_${message.role}`"
          >
            <div class="bubble">
              {{ message.content }}
            </div>
          </div>

          <div v-if="chatStore.isTyping" class="message message_assistant">
            <div class="bubble">
              AI is typing...
            </div>
          </div>
      </transition-group>
      </div>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
  import { watch, ref, nextTick } from 'vue';
  import { useChatStore } from '@/stores/chat';

  const chatStore = useChatStore()

  const container = ref<HTMLElement | null>(null)

  watch(
    () => chatStore.messageList.length,
    async () => {
      await nextTick()
      container.value?.scrollTo({
        top: container.value.scrollHeight,
        behavior: 'smooth'
      })
    }
  )

</script>

<style scoped>
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
}

.message_user {
  justify-content: flex-end;
}

.message_assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.message_user .bubble {
  background-color: #1976d2;
  color: white;
  border-bottom-right-radius: 4px;
}

.message_assistant .bubble {
  background-color: #f2f2f2;
  color: #000;
  border-bottom-left-radius: 4px;
}

.message-enter-active {
  transition: all .25s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.message-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
