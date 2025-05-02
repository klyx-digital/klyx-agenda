import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function getClients(query = '', page = 1) {
  const session = await auth()
  if (!session?.user) throw new Error('Non autorisé')

  return prisma.client.findMany({
    where: {
      userId: session.user.id,
      AND: query
        ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phone: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {},
    },
    take: 10,
    skip: (page - 1) * 10,
    orderBy: { updatedAt: 'desc' },
  })
}

export async function getClientsCount(query = '') {
  const session = await auth()
  if (!session?.user) throw new Error('Non autorisé')

  const total = await prisma.client.count({
    where: {
      userId: session.user.id,
      AND: query
        ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phone: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {},
    },
  })

  return Math.ceil(total / 10)
}

export async function getClientById(id) {
  const session = await auth()
  if (!session?.user) throw new Error('Non autorisé')

  return prisma.client.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      rdvs: {
        orderBy: { date: 'desc' },
        include: { service: true },
      },
    },
  })
}

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}
