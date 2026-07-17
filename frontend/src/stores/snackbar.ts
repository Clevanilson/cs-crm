import { ref } from 'vue'
import { defineStore } from 'pinia'

export type SnackbarVariant = 'error' | 'success' | 'info'

const DEFAULT_DURATION_MS = 5000

export const useSnackbarStore = defineStore('snackbar', () => {
  const visible = ref(false)
  const message = ref('')
  const variant = ref<SnackbarVariant>('error')

  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function clearTimer() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  function dismiss() {
    clearTimer()
    visible.value = false
  }

  function show(
    text: string,
    options?: { variant?: SnackbarVariant; durationMs?: number },
  ) {
    clearTimer()
    message.value = text
    variant.value = options?.variant ?? 'error'
    visible.value = true

    const durationMs = options?.durationMs ?? DEFAULT_DURATION_MS
    if (durationMs > 0) {
      timeoutId = setTimeout(() => {
        dismiss()
      }, durationMs)
    }
  }

  function error(text: string, durationMs?: number) {
    show(text, { variant: 'error', durationMs })
  }

  function success(text: string, durationMs?: number) {
    show(text, { variant: 'success', durationMs })
  }

  function info(text: string, durationMs?: number) {
    show(text, { variant: 'info', durationMs })
  }

  return {
    visible,
    message,
    variant,
    show,
    error,
    success,
    info,
    dismiss,
  }
})
