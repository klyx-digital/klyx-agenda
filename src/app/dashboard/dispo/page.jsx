import Dispo from '@/app/dashboard/dispo/Dispo'
import { getRdvsByDate } from '@/app/dashboard/dispo/action'
import { format } from 'date-fns'

export default async function Page() {
  const today = format(new Date(), 'yyyy-MM-dd')
  const rdvs = await getRdvsByDate(today)

  return (
    <div>
      <Dispo rdvs={rdvs} />
    </div>
  )
}
