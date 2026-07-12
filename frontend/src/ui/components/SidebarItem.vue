<script setup lang="ts">
import Icon from './Icon.vue'

defineProps<{
  icon: string
  label: string
  href: string
}>()
</script>

<template>
  <router-link :to="href" class="sidebar-item" activeClass="sidebar-item--active">
    <Icon :name="icon" />
    <span class="sidebar-item__label">{{ label }}</span>
  </router-link>
</template>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 3.8rem;
  text-decoration: none;
  color: #000;
  font-size: 1.4rem;

  .sidebar-item__label {
    color: hsl(var(--color-neutral-02));
    opacity: 0.7;
  }
}

.sidebar-item::before {
  content: '';
  display: inline-block;
  height: 100%;
  width: 0.4rem;
}

.sidebar-item:hover {
  background: hsla(var(--color-primary-01), 0.1);
}

.sidebar-item--active {
  background: hsla(var(--color-primary-01), 0.1);

  .sidebar-item__label {
    opacity: 1;
  }
}

.sidebar-item--active::before {
  background-color: hsl(var(--color-primary-01));
}
</style>
