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
const {
  clients,
  loading,
  page,
  name,
  pagination,
  totalPages,
  load,
  goToPage,
  nextPage,
  previousPage,
  searchByName,
} = useClients()

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

    <div class="clients__search">
      <label class="clients__search-label" for="client-search">Buscar por nome</label>
      <input
        id="client-search"
        class="clients__search-input"
        type="search"
        placeholder="Digite o nome do cliente"
        :value="name"
        @input="searchByName(($event.target as HTMLInputElement).value)"
      />
    </div>

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

.clients__search {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 36rem;
}

.clients__search-label {
  font-size: 1.4rem;
  font-weight: 600;
  color: hsl(var(--color-secondary));
}

.clients__search-input {
  width: 100%;
  padding: 1.2rem 1.6rem;
  border: 1px solid hsl(var(--color-neutral-02));
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-family: inherit;
  color: hsl(var(--color-secondary));
  background-color: hsl(var(--color-neutral-01));
  outline: none;
  transition: border-color 0.15s ease;
}

.clients__search-input::placeholder {
  color: hsl(var(--color-secondary));
  opacity: 0.5;
}

.clients__search-input:hover:not(:disabled) {
  border-color: hsla(var(--color-primary-01), 0.5);
}

.clients__search-input:focus {
  border-color: hsl(var(--color-primary-01));
}

.clients__search-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
