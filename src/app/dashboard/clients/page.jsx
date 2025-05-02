import ListClients from '@/app/dashboard/clients/ListClients'
import { Recherche } from './Recherche'
import { getClientsCount, getClients } from './action'
import { PaginationClient } from './PaginationClient'

export default async function Page(props) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const clients = await getClients(query, currentPage)
  const totalPages = await getClientsCount(query)
  return (
    <main>
      <Recherche />
      <ListClients query={query} currentPage={currentPage} clients={clients} />
      <div className="mt-4 flex justify-center">
        <PaginationClient totalPages={totalPages} />
      </div>
    </main>
  )
}
