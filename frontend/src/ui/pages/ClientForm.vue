<script setup lang="ts">
import FeatureHeader from '@/ui/components/FeatureHeader.vue'
import Button from '@/ui/components/Button.vue'
import Input from '@/ui/components/Input.vue'
import { useClientForm } from './client-form.state'
const { form, loading, submit, cancel } = useClientForm()
</script>

<template>
  <section class="client-form">
    <FeatureHeader title="Novo cliente" subtitle="Preencha os dados para cadastrar um cliente" />

    <form class="client-form__form" @submit.prevent="submit">
      <Input
        id="client-name"
        label="Nome"
        placeholder="Nome completo"
        autocomplete="name"
        :disabled="loading"
        :field="form.fields.name"
        @input="form.fields.name.value = $event"
        @blur="form.fields.name.touch()"
      />

      <Input
        id="client-email"
        label="E-mail"
        placeholder="email@exemplo.com"
        autocomplete="email"
        :field="form.fields.email"
        :disabled="loading"
        @input="form.fields.email.value = $event"
        @blur="form.fields.email.touch()"
      />

      <Input
        id="client-phone"
        label="Telefone"
        placeholder="11999999999"
        autocomplete="tel"
        :field="form.fields.phone"
        :disabled="loading"
        @input="form.fields.phone.value = $event"
        @blur="form.fields.phone.touch()"
      />

      <div class="client-form__actions">
        <Button variant="secondary" type="button" :disabled="loading" @click="cancel">
          Cancelar
        </Button>
        <Button type="submit" :loading="loading" :disabled="!form.getValid()" @click="submit">
          Salvar cliente
        </Button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.client-form {
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 56rem;
}

.client-form__form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.client-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 0.8rem;
}
</style>
