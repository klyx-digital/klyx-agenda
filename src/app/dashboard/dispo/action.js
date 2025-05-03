'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function getRdvsByDate() {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Non autorisé')
  }

  const rdvs = await prisma.rdv.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      client: true,
      service: true,
    },
    orderBy: {
      date: 'asc',
    },
  })
  return rdvs
}

const AvailabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
})

export async function saveAvailability(prevState, formData) {
  const session = await auth()
  if (!session || !session.user) {
    return { message: 'Non autorisé' }
  }

  const availabilities = JSON.parse(formData.get('availabilities') || '[]')

  if (!Array.isArray(availabilities)) {
    return { message: 'Format des disponibilités invalide' }
  }

  try {
    for (const availability of availabilities) {
      const parsed = AvailabilitySchema.safeParse(availability)
      if (!parsed.success) continue

      await prisma.availability.create({
        data: {
          dayOfWeek: parsed.data.dayOfWeek,
          startTime: parsed.data.startTime,
          endTime: parsed.data.endTime,
          userId: session.user.id,
        },
      })
    }

    return { message: 'Disponibilités enregistrées avec succès' }
  } catch (error) {
    return { message: 'Erreur lors de l’enregistrement des disponibilités' }
  }
}
