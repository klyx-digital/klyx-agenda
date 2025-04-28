'use server'

import { prisma } from '@/lib/prisma'
import { userSchema } from '@/schemas/userSchema'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function registerUser(prevState, formData) {
  const validatedFields = userSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Erreur de validation.',
    }
  }

  const { email, password, firstName, lastName } = validatedFields.data

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      errors: { email: ['Cet email est déjà utilisé.'] },
      message: null,
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  })

  redirect('/login')
}
