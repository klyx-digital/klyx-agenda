import { SidebarDashboard } from '@/components/page/layout/SidebarDashboard'

export default function Layout({ children }) {
  return (
    <main>
      <SidebarDashboard>{children}</SidebarDashboard>
    </main>
  )
}
