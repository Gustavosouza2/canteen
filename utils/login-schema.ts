import { z } from 'zod'

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'**-/=?^_`{|}~]{1,64}@([a-zA-Z0-9-]{1,63}\.){1,}[a-zA-Z]{2,}$/

export const LoginSchema = z.object({
  email: z
    .string()
    .regex(emailRegex, { message: 'Please enter a valid email' }),
  password: z.string().min(6, { message: 'Password is too short' }),
})
