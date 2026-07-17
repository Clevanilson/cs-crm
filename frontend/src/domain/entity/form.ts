import type { FormField } from './form-field'

type FormValues<TFields extends Record<string, FormField<unknown>>> = {
  [K in keyof TFields]: TFields[K] extends FormField<infer V> ? V : never
}

export class Form<TFields extends Record<string, FormField<unknown>>> {
  private _error = null as string | null
  private _fields = {} as TFields

  constructor(fields: TFields) {
    const update = (fieldKey: keyof TFields) => {
      this._error = this._fields[fieldKey]!.getError()
    }
    Object.entries(fields).forEach(([key, field]) => {
      const proxy = new Proxy(field, {
        set(target, prop, value) {
          target[prop as keyof FormField<unknown>] = value
          update(key as keyof TFields)
          return true
        },
      }) as TFields[keyof TFields]
      this._fields[key as keyof TFields] = proxy
    })
  }

  getValid(): boolean {
    return this._error === null
  }

  get fields(): TFields {
    return this._fields
  }

  submit(): FormValues<TFields> {
    if (!this.getValid()) {
      throw new Error('Form is invalid')
    }
    const values = {} as FormValues<TFields>
    for (const [key, field] of Object.entries(this._fields) as Array<
      [keyof TFields, TFields[keyof TFields]]
    >) {
      values[key] = field.value as FormValues<TFields>[typeof key]
    }
    return values
  }
}
