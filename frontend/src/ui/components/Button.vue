<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    disabled: false,
    loading: false,
  },
)
</script>

<template>
  <button
    class="button"
    :class="[`button--${variant}`, { 'button--loading': loading }]"
    :type="type"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  min-height: 4.4rem;
  padding: 1.2rem 2rem;
  border: 1px solid transparent;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button--primary {
  background-color: hsl(var(--color-primary-01));
  color: hsl(var(--color-neutral-01));
}

.button--primary:hover:not(:disabled) {
  background-color: hsla(var(--color-primary-01), 0.85);
}

.button--secondary {
  background-color: transparent;
  border-color: hsl(var(--color-neutral-02));
  color: hsl(var(--color-secondary));
}

.button--secondary:hover:not(:disabled) {
  background-color: hsla(var(--color-primary-01), 0.06);
}

.button__spinner {
  width: 1.4rem;
  height: 1.4rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
