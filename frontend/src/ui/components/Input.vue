<script setup lang="ts" generic="TValue">
type FormField<TValue> = {
  value: TValue
  getError: () => string | null
  getTouched: () => boolean
}

type Props = {
  id: string
  label: string
  type?: string
  placeholder?: string
  autocomplete?: string
  disabled?: boolean
  field: FormField<TValue>
}

type Emits = {
  input: [value: TValue]
  blur: [event: FocusEvent]
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  autocomplete: 'off',
  disabled: false,
})

defineEmits<Emits>()
</script>

<template>
  <div class="field">
    <label class="field__label" :for="id">{{ label }}</label>
    <input
      :id="id"
      class="field__input"
      :class="{ 'field__input--error': !!field.getError() && field.getTouched() }"
      :disabled="disabled"
      :type="type"
      :value="field.value"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="!!field.getError()"
      :aria-describedby="field.getError() ? `${id}-error` : undefined"
      @input="$emit('input', ($event.target as HTMLInputElement).value as TValue)"
      @blur="$emit('blur', $event)"
    />
    <p
      v-if="field.getError() && field.getTouched()"
      :id="`${id}-error`"
      class="field__error"
      role="alert"
    >
      {{ field.getError() }}
    </p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.field__label {
  font-size: 1.4rem;
  font-weight: 600;
  color: hsl(var(--color-secondary));
}

.field__input {
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

.field__input::placeholder {
  color: hsl(var(--color-secondary));
  opacity: 0.5;
}

.field__input:hover:not(:disabled) {
  border-color: hsla(var(--color-primary-01), 0.5);
}

.field__input:focus {
  border-color: hsl(var(--color-primary-01));
}

.field__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.field__input--error {
  border-color: hsl(var(--color-tertiary));
}

.field__error {
  font-size: 1.2rem;
  color: hsl(var(--color-tertiary));
}
</style>
