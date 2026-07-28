import type { ClientGateway } from '@/application/gateway/client.gateway'
import { computed, inject, ref } from 'vue'
import type { ClientResDTO } from '@/domain/dto/client-res.dto'
import type { ListClientsReqDTO } from '@/domain/dto/list-clients-req.dto'
import type { PaginationResDTO } from '@/domain/dto/pagination-res.dto'
import { useSnackbarStore } from '@/stores/snackbar'
import { SEARCH_DEBOUNCE_MS } from '@/domain/const/debounce.const'
import { DEFAULT_PAGINATION } from '@/domain/const/pagination.const'
import { Debounce } from '@/domain/service/debounce'

export function useClients() {
  const clientGateway = inject<ClientGateway>('clientGateway')
  const loading = ref(false)
  const snackbar = useSnackbarStore()
  const clients = ref<ClientResDTO[]>([])
  const page = ref(DEFAULT_PAGINATION.page)
  const size = ref(DEFAULT_PAGINATION.size)
  const name = ref('')
  const pagination = ref<PaginationResDTO>(DEFAULT_PAGINATION)
  const searchDebounce = new Debounce()
  const totalPages = computed(() => {
    if (pagination.value.size <= 0) {
      return 0
    }
    return Math.ceil(pagination.value.total / pagination.value.size)
  })
  const hasPrevious = computed(() => page.value > 0)
  const hasNext = computed(() => page.value + 1 < totalPages.value)

  async function load() {
    try {
      loading.value = true
      const query: ListClientsReqDTO = { page: page.value, size: size.value }
      const trimmedName = name.value.trim()
      if (trimmedName) {
        query.name = trimmedName
      }
      const response = await clientGateway?.list(query)
      clients.value = response?.data ?? []
      pagination.value = response?.pagination ?? DEFAULT_PAGINATION
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar clientes'
      snackbar.error(message)
    } finally {
      loading.value = false
    }
  }

  async function nextPage() {
    if (!hasNext.value) return
    await goToPage(page.value + 1)
  }

  async function previousPage() {
    if (!hasPrevious.value) return
    await goToPage(page.value - 1)
  }

  async function goToPage(nextPage: number) {
    page.value = nextPage
    await load()
  }

  function searchByName(value: string) {
    name.value = value
    page.value = 0
    searchDebounce.run(() => {
      void load()
    })
  }

  return {
    clients,
    loading,
    page,
    size,
    name,
    pagination,
    totalPages,
    hasPrevious,
    hasNext,
    load,
    goToPage,
    nextPage,
    previousPage,
    searchByName,
  }
}
