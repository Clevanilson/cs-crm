import type { ClientGateway } from '@/application/gateway/client.gateway'
import { inject, ref } from 'vue'
import type { ClientResDto } from '@/domain/dto/client-res.dto'
import { useSnackbarStore } from '@/stores/snackbar'

export function useClients() {
  const clientGateway = inject<ClientGateway>('clientGateway')
  const loading = ref(false)
  const snackbar = useSnackbarStore()
  const clients = ref<ClientResDto[] | undefined>()

  async function load() {
    try {
      loading.value = true
      clients.value = await clientGateway?.list()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar clientes'
      snackbar.error(message)
    } finally {
      loading.value = false
    }
  }
  return {
    clients,
    loading,
    load,
  }
}
