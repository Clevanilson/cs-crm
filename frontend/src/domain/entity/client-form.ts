import { EmailValidation } from '@/domain/validations/email'
import { NameValidation } from '@/domain/validations/name'
import { PhoneValidation } from '@/domain/validations/phone'
import { RequiredValidation } from '@/domain/validations/required'
import { Form } from './form'
import { FormField } from './form-field'

export class ClientForm extends Form<{
  name: FormField<string>
  email: FormField<string>
  phone: FormField<string>
}> {
  constructor() {
    super({
      name: new FormField<string>('', [new RequiredValidation(), new NameValidation()]),
      email: new FormField<string>('', [new RequiredValidation(), new EmailValidation()]),
      phone: new FormField<string>('', [new RequiredValidation(), new PhoneValidation()]),
    })
  }
}
