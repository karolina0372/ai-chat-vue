<template>
  <v-app :theme="chatStore.theme">
    <router-view />
  </v-app>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from '@/stores/chat';

const chatStore = useChatStore()
const route = useRoute()

onMounted(() => {
  chatStore.init(route.params.id as string | undefined)
})
</script>
