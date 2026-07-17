import { inject, ref } from 'vue'
import { ClientForm } from '@/domain/entity/client-form.ts'
import type { ClientGateway } from '@/application/gateway/client.gateway.ts'
import { useSnackbarStore } from '@/stores/snackbar'
import { useRouter } from 'vue-router'

export function useClientForm() {
  const router = useRouter()
  const gateway = inject<ClientGateway>('clientGateway')
  const snackbar = useSnackbarStore()
  const loading = ref(false)
  const form = ref(new ClientForm())

  function cancel() {
    router.push('/clients')
  }

  async function submit() {
    try {
      loading.value = true
      const client = form.value.submit()
      await gateway?.create(client)
      snackbar.success('Cliente salvo com sucesso')
      router.push('/clients')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar cliente'
      snackbar.error(message)
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    loading,
    submit,
    cancel,
  }
}
