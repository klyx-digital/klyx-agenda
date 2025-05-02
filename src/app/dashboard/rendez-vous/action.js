'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getRdvByUser() {
  const session = await auth()
  if (!session) throw new Error('Non autorisé')

  const rdvs = await prisma.rdv.findMany({
    where: {
      userId: session.user.id,
    },
    include: { client: true, service: true, payment: true },
    orderBy: { date: 'asc' },
  })

  return rdvs
}

const createRdvSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Date invalide',
  }),
  heure: z.string().regex(/^\d{2}:\d{2}$/, 'Heure invalide (format HH:MM)'),
  serviceId: z.string().min(1),
  prix: z.coerce.number().positive().optional(),
  nomClient: z.string().min(1),
  emailClient: z.string().email().optional(),
  telephoneClient: z.string().min(8).optional(),
  statusPaiement: z.enum(['paid', 'pending', 'onsite']),
  duration: z.coerce.number().min(15).max(480),
})

export async function createRdv(state, formData) {
  const session = await auth()
  if (!session) throw new Error('Non autorisé')

  const data = Object.fromEntries(formData)

  const validatedFields = createRdvSchema.safeParse({
    date: data.date,
    heure: data.heureRdv,
    serviceId: data.service,
    prix: Number(data.prix),
    nomClient: data.nameCLient,
    emailClient: data.email,
    telephoneClient: data.tel,
    statusPaiement: data.paymentStatus,
    duration: data.duration,
  })
  console.log(validatedFields)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  const {
    date,
    heure,
    serviceId,
    prix,
    nomClient,
    emailClient,
    telephoneClient,
    statusPaiement,
  } = validatedFields.data

  const [hour, minute] = heure.split(':').map(Number)
  const dateObj = new Date(date)
  dateObj.setHours(hour, minute, 0, 0)

  try {
    const client = await prisma.client.upsert({
      where: {
        email_userId: {
          email: emailClient,
          userId: session.user.id,
        },
      },
      update: {},
      create: {
        name: nomClient,
        email: emailClient,
        phone: telephoneClient,
        userId: session.user.id,
      },
    })

    let service = await prisma.service.findFirst({
      where: {
        name: serviceId,
        userId: session.user.id,
      },
    })

    if (!service) {
      service = await prisma.service.create({
        data: {
          name: serviceId,
          price: prix || 0,
          duration: 60,
          userId: session.user.id,
        },
      })
    }

    console.log('RDV à créer avec :', {
      date: dateObj,
      nomClient,
      emailClient,
      serviceId,
    })

    const rdv = await prisma.rdv.create({
      data: {
        date: dateObj,
        clientName: nomClient,
        clientEmail: emailClient,
        clientPhone: telephoneClient,
        paid: statusPaiement === 'paid',
        service: { connect: { id: service.id } },
        user: { connect: { id: session.user.id } },
        client: { connect: { id: client.id } },
      },
    })

    if (statusPaiement === 'paid') {
      await prisma.payment.create({
        data: {
          amount: prix * 100,
          status: 'paid',
          rdv: { connect: { id: rdv.id } },
          user: { connect: { id: session.user.id } },
        },
      })
    }

    revalidatePath('/dashboard/rendez-vous')
    redirect('/dashboard/rendez-vous')
  } catch (error) {
    if (error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error
    }
    console.error('Erreur Prisma lors de la création :', error)

    return {
      message: 'Erreur serveur : impossible de créer le RDV.',
    }
  }
}
