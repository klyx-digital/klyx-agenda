import Stat from '@/app/dashboard/Stat'
import { getStats } from '@/app/dashboard/action'

export default async function Page() {
  const rawStats = await getStats()

  const stats = [
    {
      id: 1,
      name: 'Prochain RDV',
      value: rawStats.nextRdv
        ? new Date(rawStats.nextRdv.date).toLocaleString('fr-FR', {
            dateStyle: 'full',
            timeStyle: 'short',
          })
        : 'Aucun',
    },
    {
      id: 2,
      name: 'Nouveaux clients ce mois',
      value: rawStats.newClients ?? 0,
    },
    {
      id: 3,
      name: 'Revenus générés ce mois',
      value: rawStats.revenu ? `${rawStats.revenu} €` : '0 €',
    },
  ]

  return (
    <section>
      <Stat stats={stats} />
    </section>
  )
}
