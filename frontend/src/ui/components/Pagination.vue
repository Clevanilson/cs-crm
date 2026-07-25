<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    page: number
    totalPages: number
    total: number
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  previous: []
  next: []
  'go-to': [page: number]
}>()

const displayPage = computed(() => (props.totalPages === 0 ? 0 : props.page + 1))
const hasPrevious = computed(() => props.page > 0)
const hasNext = computed(() => props.page + 1 < props.totalPages)

const pageNumbers = computed(() => {
  if (props.totalPages <= 0) {
    return []
  }

  const current = props.page
  const last = props.totalPages - 1
  const windowSize = 5
  let start = Math.max(0, current - Math.floor(windowSize / 2))
  let end = Math.min(last, start + windowSize - 1)
  start = Math.max(0, end - windowSize + 1)

  const pages: number[] = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})
</script>

<template>
  <nav class="pagination" aria-label="Paginação">
    <p class="pagination__summary">
      {{ total === 0 ? 'Nenhum registro' : `${total} registro${total === 1 ? '' : 's'}` }}
      <span v-if="totalPages > 0"> · Página {{ displayPage }} de {{ totalPages }}</span>
    </p>

    <div class="pagination__controls">
      <button
        type="button"
        class="pagination__nav"
        :disabled="disabled || !hasPrevious"
        @click="emit('previous')"
      >
        Anterior
      </button>

      <div class="pagination__pages">
        <button
          v-for="pageNumber in pageNumbers"
          :key="pageNumber"
          type="button"
          class="pagination__page"
          :class="{ 'pagination__page--active': pageNumber === page }"
          :disabled="disabled"
          :aria-current="pageNumber === page ? 'page' : undefined"
          @click="emit('go-to', pageNumber)"
        >
          {{ pageNumber + 1 }}
        </button>
      </div>

      <button
        type="button"
        class="pagination__nav"
        :disabled="disabled || !hasNext"
        @click="emit('next')"
      >
        Próxima
      </button>
    </div>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
}

.pagination__summary {
  margin: 0;
  font-size: 1.4rem;
  color: hsl(var(--color-secondary));
}

.pagination__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
}

.pagination__pages {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.pagination__nav,
.pagination__page {
  min-height: 3.6rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid hsl(var(--color-neutral-02));
  border-radius: 0.8rem;
  background-color: transparent;
  color: hsl(var(--color-secondary));
  font-size: 1.4rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.pagination__page {
  min-width: 3.6rem;
  padding-inline: 1rem;
}

.pagination__nav:hover:not(:disabled),
.pagination__page:hover:not(:disabled):not(.pagination__page--active) {
  background-color: hsla(var(--color-primary-01), 0.06);
}

.pagination__page--active {
  background-color: hsl(var(--color-primary-01));
  border-color: hsl(var(--color-primary-01));
  color: hsl(var(--color-neutral-01));
  cursor: default;
}

.pagination__nav:disabled,
.pagination__page:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .pagination {
    flex-direction: column;
    align-items: stretch;
  }

  .pagination__controls {
    justify-content: space-between;
  }
}
</style>
