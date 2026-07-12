<script setup lang="ts">
import Icon from './Icon.vue'
</script>

<template>
  <section class="sidebar-header">
    <Icon name="logo" />
    <div>
      <h2 class="sidebar-header__title">CS CRM</h2>
      <p class="sidebar-header__subtitle">Enterprise Edition</p>
    </div>
  </section>
</template>

<style scoped>
.sidebar-header {
  display: flex;
  gap: 1.6rem;
  margin-bottom: 3.2rem;
  padding: 1.6rem;

  .sidebar-header__title {
    font-size: 2.4rem;
    font-weight: 700;
    color: hsl(var(--color-neutral-01));
  }

  .sidebar-header__subtitle {
    font-size: 1.4rem;
    color: hsla(var(--color-neutral-02), 0.7);
  }
}
</style>
