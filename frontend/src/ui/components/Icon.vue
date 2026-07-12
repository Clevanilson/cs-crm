<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <img :src="`/icons/${name}.svg`" :alt="name" />
</template>

<style scoped></style>
