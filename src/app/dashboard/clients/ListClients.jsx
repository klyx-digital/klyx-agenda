import Image from 'next/image'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'

export default function ClientsTable({ clients }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Client</th>
                <th className="px-3 py-5 font-medium">Téléphone</th>
                <th className="px-3 py-5 font-medium">Dernier RDV</th>
                <th className="px-3 py-5 font-medium">Total payé</th>
                <th className="px-3 py-5 font-medium">Nombre de RDV</th>
                <th className="py-3 pr-3 pl-6 text-right">
                  <span className="sr-only">Voir</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="py-3 pr-3 pl-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div>
                        <p>{client.name}</p>
                        <p className="text-xs text-gray-500">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {client.phone || '-'}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {client.lastRdvDate
                      ? format(new Date(client.lastRdvDate), 'PPP', {
                          locale: fr,
                        })
                      : 'Aucun'}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {client.totalSpent} €
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {client.rdvCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
