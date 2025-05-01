import Calendar from '@/app/dashboard/rendez-vous/Calendar'
import { getRdvByUser } from './action'

export default async function Page() {
  const rdvs = await getRdvByUser()
  return (
    <div>
      <Calendar rdvs={rdvs} />
    </div>
  )
}
