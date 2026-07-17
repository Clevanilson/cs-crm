<script setup lang="ts">
import Sidebar from '@/ui/components/Sidebar.vue'
import Snackbar from '@/ui/components/Snackbar.vue'
</script>

<template>
  <Sidebar>
    <RouterView />
  </Sidebar>
  <Snackbar />
</template>

<style scoped></style>
