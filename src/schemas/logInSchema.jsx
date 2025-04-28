import { z } from 'zod'

export const logInSchema = z.object({
  email: z
    .string({ required_error: 'Email obligatoire' })
    .email({ message: 'Email invalide' }),
  password: z.string({ required_error: 'Mot de passe obligatoire' }),
})
