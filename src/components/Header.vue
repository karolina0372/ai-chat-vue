<template>
  <v-app-bar
    v-if="mdAndUp"
    color="surface-variant" 
    name="app-bar"
    title="AI CHAT"
  >
    <v-btn
      :prepend-icon="icon"
      text="Toggle Theme"
      slim
      @click="onClick"
    ></v-btn>
  </v-app-bar>

  <v-app-bar
    v-if="smAndDown"
    :elevation="2"
    color="surface-variant" 
    title="AI CHAT"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-btn
      :prepend-icon="icon"
      text="Toggle Theme"
      slim
      @click="onClick"
    ></v-btn>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    temporary
  >
    <Navigation />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { Theme } from '@/stores/types'
import { useDisplay } from 'vuetify'
import Navigation from '@/components/Navigation.vue';

const { mdAndUp, smAndDown } = useDisplay()

const chatStore = useChatStore()

const group = ref(null)
const drawer = ref(false)

const icon = computed(() => {
  return chatStore.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
})

function onClick(): void {
  chatStore.theme =
    chatStore.theme === Theme.Light
      ? Theme.Dark
      : Theme.Light
}

watch(group, () => {
  drawer.value = false
})
</script>
