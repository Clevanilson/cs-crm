<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SidebarHeader from './SidebarHeader.vue'
import SidebarItem from './SidebarItem.vue'
import SidebarOverlay from './SidebarOverlay.vue'
import SidebarToggle from './SidebarToggle.vue'

const route = useRoute()
const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

watch(
  () => route.path,
  () => {
    close()
  },
)
</script>

<template>
  <div class="sidebar-container">
    <SidebarToggle :is-open="isOpen" @toggle="toggle" />
    <SidebarOverlay :is-open="isOpen" @close="close" />

    <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
      <SidebarHeader />
      <nav>
        <ul>
          <li>
            <SidebarItem icon="dashboard" label="Dashboard" href="/dashboard" />
          </li>
          <li>
            <SidebarItem icon="clients" label="Clientes" href="/clients" />
          </li>
        </ul>
      </nav>
    </aside>

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.sidebar-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  flex-shrink: 0;
  width: 26rem;
  max-width: 26rem;
  height: 100vh;
  padding-top: 3.2rem;
  background-color: hsl(var(--color-primary-02));
  border-right: 1px solid hsl(var(--color-neutral-02));
}

.main {
  flex: 1;
  min-width: 0;
  overflow: auto;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 25;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }

  .sidebar--open {
    transform: translateX(0);
  }

  .main {
    width: 100%;
  }
}
</style>
