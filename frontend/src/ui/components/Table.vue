<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { TableColumn } from '@/domain/type/table-column'

withDefaults(
  defineProps<{
    columns: TableColumn<T>[]
    rows: T[]
    loading?: boolean
    emptyMessage?: string
    rowKey?: keyof T & string
  }>(),
  {
    loading: false,
    emptyMessage: 'Nenhum registro encontrado',
    rowKey: 'id',
  },
)

function cellValue(row: T, column: TableColumn<T>): string {
  const value = row[column.key]
  if (column.formatter) {
    return column.formatter(value, row)
  }
  if (value == null) {
    return ''
  }
  return String(value)
}

function resolveRowKey(row: T, index: number, key: keyof T & string): string | number {
  const value = row[key]
  if (typeof value === 'string' || typeof value === 'number') {
    return value
  }
  return index
}
</script>

<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" scope="col">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length" class="table__state">Carregando...</td>
        </tr>
        <tr v-else-if="rows.length === 0">
          <td :colspan="columns.length" class="table__state">{{ emptyMessage }}</td>
        </tr>
        <tr v-for="(row, index) in rows" v-else :key="resolveRowKey(row, index, rowKey)">
          <td v-for="column in columns" :key="column.key">
            {{ cellValue(row, column) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid hsl(var(--color-neutral-02));
  border-radius: 0.8rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.4rem;
  color: hsl(var(--color-secondary));
}

.table th,
.table td {
  padding: 1.2rem 1.6rem;
  text-align: left;
  white-space: nowrap;
}

.table thead {
  background-color: hsl(var(--color-neutral-02));
}

.table th {
  font-weight: 600;
}

.table tbody tr + tr {
  border-top: 1px solid hsl(var(--color-neutral-02));
}

.table tbody tr:hover {
  background-color: hsla(var(--color-primary-01), 0.06);
}

.table__state {
  text-align: center;
  color: hsl(var(--color-secondary));
  opacity: 0.7;
}
</style>
