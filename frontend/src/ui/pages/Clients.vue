<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { ClientResDTO } from '@/domain/dto/client-res.dto'
import Button from '@/ui/components/Button.vue'
import FeatureHeader from '@/ui/components/FeatureHeader.vue'
import Pagination from '@/ui/components/Pagination.vue'
import Table from '@/ui/components/Table.vue'
import type { TableColumn } from '@/domain/type/table-column'
import { useClients } from './clients.state'

const router = useRouter()
const { clients, loading, page, pagination, totalPages, load, goToPage, nextPage, previousPage } =
  useClients()

const columns: TableColumn<ClientResDTO>[] = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail' },
  { key: 'phone', label: 'Telefone' },
]

onMounted(() => {
  void load()
})
</script>

<template>
  <section class="clients">
    <FeatureHeader title="Clientes" subtitle="Gerencie seus clientes e suas informações">
      <Button type="button" @click="router.push('/clients/new')">Novo cliente</Button>
    </FeatureHeader>

    <Table
      :columns="columns"
      :rows="clients"
      :loading="loading"
      empty-message="Nenhum cliente encontrado"
    />

    <Pagination
      :page="page"
      :total-pages="totalPages"
      :total="pagination.total"
      :disabled="loading"
      @previous="previousPage"
      @next="nextPage"
      @go-to="goToPage"
    />
  </section>
</template>

<style scoped>
.clients {
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
</style>
