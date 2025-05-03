'use server'
import { prisma } from '@/lib/prisma'
import { startOfMonth } from 'date-fns'
import { auth } from '@/auth'

export async function getStats() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw new Error('Non authentifié')
  }

  const now = new Date()
  const startMonth = startOfMonth(now)

  const nextRdv = await prisma.rdv.findFirst({
    where: {
      userId,
      date: { gte: now },
    },
    orderBy: { date: 'asc' },
    include: { service: true },
  })

  const newClients = await prisma.client.count({
    where: {
      userId,
      createdAt: { gte: startMonth },
    },
  })

  const revenuTotal = await prisma.rdv.findMany({
    where: {
      userId,
      paid: true,
      date: { gte: startMonth },
    },
    include: { service: true },
  })

  const total = revenuTotal.reduce((acc, rdv) => acc + rdv.service.price, 0)

  return {
    nextRdv,
    newClients,
    revenu: total,
  }
}
