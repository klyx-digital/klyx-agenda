'use server'

import { z } from 'zod'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

const formulaireSchema = z.object({
  country: z.string().optional(),
  streetaddress: z.string().optional(),
  city: z.string().optional(),
  postalcode: z.string().optional(),

  servicename: z.string().optional(),
  serviceduration: z.string().optional(),
  serviceprice: z.string().optional(),
  servicedescription: z.string().optional(),

  username: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  tiktok: z.string().optional(),
  website: z.string().optional(),

  // Champs horaires (1 par jour)
  lundi_start: z.string().optional(),
  lundi_end: z.string().optional(),
  mardi_start: z.string().optional(),
  mardi_end: z.string().optional(),
  mercredi_start: z.string().optional(),
  mercredi_end: z.string().optional(),
  jeudi_start: z.string().optional(),
  jeudi_end: z.string().optional(),
  vendredi_start: z.string().optional(),
  vendredi_end: z.string().optional(),
  samedi_start: z.string().optional(),
  samedi_end: z.string().optional(),
  dimanche_start: z.string().optional(),
  dimanche_end: z.string().optional(),
})

const infoEntrepriseSchema = z.object({
  name: z.string().optional(),
  about: z.string().optional(),
})

export async function infoEntreprise(state, formData) {
  const session = await auth()
  const userId = session.user?.id

  if (!userId) {
    throw new Error('Utilisateur non authentifier')
  }

  const validatedFields = infoEntrepriseSchema.safeParse({
    name: formData.get('name'),
    about: formData.get('about'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update .',
    }
  }

  const { name, about } = validatedFields.data

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        businessName: name,
        bio: about,
      },
    })
  } catch (error) {
    console.error(error)
    return { message: "Erreur lors de la mise à jour de l'entreprise." }
  }
}
