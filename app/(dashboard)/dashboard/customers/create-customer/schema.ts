import { z } from 'zod'

import { emailRegex } from '@/utils/login-schema'

export const CreateCustomerSchema = z.object({
  email: z.string().regex(emailRegex, { message: 'Insira um email válido' }),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter mais de 3 caracteres' }),
  amount: z.number(),
  status: z.string(),
})
