<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'

const snackbar = useSnackbarStore()
const { visible, message, variant } = storeToRefs(snackbar)
</script>

<template>
  <Transition name="snackbar">
    <div
      v-if="visible"
      class="snackbar"
      :class="`snackbar--${variant}`"
      :role="variant === 'error' ? 'alert' : 'status'"
      aria-live="polite"
    >
      <p class="snackbar__message">{{ message }}</p>
      <button
        type="button"
        class="snackbar__dismiss"
        aria-label="Fechar"
        @click="snackbar.dismiss()"
      >
        ×
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 2.4rem;
  left: 50%;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  max-width: min(48rem, calc(100vw - 3.2rem));
  padding: 1.4rem 1.6rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.8rem 2.4rem hsla(var(--color-primary-02), 0.18);
  transform: translateX(-50%);
}

.snackbar--error {
  background-color: hsl(var(--color-tertiary));
  color: hsl(var(--color-neutral-01));
}

.snackbar--success {
  background-color: hsl(var(--color-primary-01));
  color: hsl(var(--color-neutral-01));
}

.snackbar--info {
  background-color: hsl(var(--color-primary-02));
  color: hsl(var(--color-neutral-01));
}

.snackbar__message {
  flex: 1;
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: inherit;
  line-height: 1.4;
}

.snackbar__dismiss {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  padding: 0;
  border: none;
  border-radius: 0.4rem;
  background: transparent;
  color: inherit;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.15s ease, background-color 0.15s ease;
}

.snackbar__dismiss:hover {
  opacity: 1;
  background-color: hsla(var(--color-neutral-01), 0.12);
}

.snackbar-enter-active,
.snackbar-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.snackbar-enter-from,
.snackbar-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(1.2rem);
}
</style>
