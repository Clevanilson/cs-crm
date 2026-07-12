<script setup lang="ts">
import Icon from './Icon.vue'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    type="button"
    class="sidebar-toggle"
    :aria-expanded="isOpen"
    aria-label="Abrir ou fechar menu"
    @click="$emit('toggle')"
  >
    <Icon name="menu" />
  </button>
</template>

<style scoped>
.sidebar-toggle {
  display: none;
  position: fixed;
  top: 1.6rem;
  right: 1.6rem;
  z-index: 30;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  padding: 0;
  border: 0.1rem solid hsl(var(--color-neutral-02));
  border-radius: 0.8rem;
  background-color: hsl(var(--color-primary-02));
  cursor: pointer;
}

.sidebar-toggle :deep(img) {
  width: 2.4rem;
  height: 2.4rem;
}

@media (max-width: 768px) {
  .sidebar-toggle {
    display: flex;
  }
}
</style>
