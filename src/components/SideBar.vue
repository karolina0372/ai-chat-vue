<template>
  <v-navigation-drawer v-if="mdAndUp" permanent>
    <Navigation />
  </v-navigation-drawer>

  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    v-if="smAndDown"
  >
    <Navigation />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Navigation from '@/components/Navigation.vue'
  import { useChatStore } from '@/stores/chat'
  import { useDisplay } from 'vuetify'

  const { mdAndUp, smAndDown } = useDisplay()

  const drawer = ref(false)
</script>