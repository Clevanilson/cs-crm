<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="feature-header">
    <div class="feature-header__text">
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.default" class="feature-header__actions">
      <slot />
    </div>
  </header>
</template>

<style scoped>
.feature-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.6rem;
}

.feature-header__text {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.feature-header__actions {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-shrink: 0;
}
</style>
