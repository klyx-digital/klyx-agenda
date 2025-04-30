import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SidebarDashboard } from '@/components/page/layout/SidebarDashboard'

export default async function Layout({ children }) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }
  return (
    <main>
      <SidebarDashboard>{children}</SidebarDashboard>
    </main>
  )
}
