import { z } from 'zod'

export const userSchema = z.object({
  email: z
    .string({ required_error: 'Email obligatoire' })
    .email({ message: 'Email invalide' }),
  password: z
    .string({ required_error: 'Mot de passe obligatoire' })
    .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})
