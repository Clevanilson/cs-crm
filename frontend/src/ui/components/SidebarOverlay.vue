<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    v-show="isOpen"
    class="sidebar-overlay"
    aria-hidden="true"
    @click="$emit('close')"
  />
</template>

<style scoped>
.sidebar-overlay {
  display: none;
}

@media (max-width: 768px) {
  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 20;
    background-color: hsla(0, 0%, 0%, 0.5);
  }
}
</style>
