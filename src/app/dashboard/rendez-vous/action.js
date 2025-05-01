'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function getRdvByUser() {
  const session = await auth()
  if (!session) throw new Error('Non autorisé')

  const rdvs = await prisma.rdv.findMany({
    where: {
      userId: session.user.id,
    },
    include: { client: true, service: true, payment: true },
  })

  return rdvs
}
